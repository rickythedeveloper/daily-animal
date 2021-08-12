import { ipcRenderer } from 'electron/renderer';
import { BreedData } from '../models/accessDogAPI';
import Component from '../models/Component';
import { MessageType } from '../index/constants';
import navigation from '../models/navigation';
import BreedContainerElem from './BreedContainerElem';

class BreedThumbnail extends Component<'div'> {
	constructor(public data: BreedData) {
		super('div');
		this.element.classList.add('breedThumbnail');
		this.element.onclick = this.onClick.bind(this);

		if (data.name === undefined) return;

		const breedNameComponent = new Component('div');
		breedNameComponent.element.classList.add('breedThumbnailName');
		breedNameComponent.element.innerText = data.name || '';
		this.appendChild(breedNameComponent);

		const imageUrl = data.image?.url;
		if (imageUrl) {
			const imageComponent = new Component('img');
			imageComponent.element.src = imageUrl;
			imageComponent.element.classList.add('breedThumbnailImage');
			this.appendChild(imageComponent);
		}
	}

	async getBreedPhotoUrls(): Promise<string[]> {
		const breedId = this.data.id;
		if (breedId === undefined) return [];
		return ipcRenderer.invoke(MessageType[MessageType.requestBreedPhotoUrls], breedId) as Promise<string[]>;
	}

	async onClick() {
		const photoUrls = await this.getBreedPhotoUrls();
		navigation.navigate(BreedContainerElem({ breedData: this.data, photoUrls }));
	}
}

export default BreedThumbnail;
