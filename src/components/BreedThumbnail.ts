import { ipcRenderer } from 'electron/renderer';
import { BreedData } from '../models/accessDogAPI';
import Component from '../models/Component';
import { MessageType } from '../index/constants';
import navigation from '../models/navigation';
import BreedContainer from './BreedContainer';
import Carousel from './Carousel';

class BreedThumbnail extends Component<'div'> {
	carousel: Carousel = new Carousel();

	_photoUrls: string[] = [];

	get photoUrls() { return this._photoUrls; }

	set photoUrls(value) {
		this.carousel.photoUrls = value;
		this._photoUrls = value;
	}

	constructor(public data: BreedData) {
		super('div');
		this.element.classList.add('breedThumbnail');
		this.element.onclick = this.onClick.bind(this);

		if (data.name === undefined) return;

		const breedNameComponent = new Component('div');
		breedNameComponent.element.classList.add('breedThumbnailName');
		breedNameComponent.element.innerText = data.name || '';
		this.appendChild(breedNameComponent);

		this.appendChild(this.carousel);

		const imageUrl = data.image?.url;
		if (imageUrl) this.photoUrls = [imageUrl];

		this.getBreedPhotoUrls().then((urls) => {
			this.photoUrls = urls;
		});
	}

	async getBreedPhotoUrls(): Promise<string[]> {
		const breedId = this.data.id;
		if (breedId === undefined) return [];
		return ipcRenderer.invoke(MessageType[MessageType.requestBreedPhotoUrls], breedId) as Promise<string[]>;
	}

	async onClick() {
		navigation.navigate(new BreedContainer(this.data, this.photoUrls));
	}
}

export default BreedThumbnail;
