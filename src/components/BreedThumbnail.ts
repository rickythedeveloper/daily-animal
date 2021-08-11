import { BreedData } from '../models/accessDogAPI';
import Component from '../models/Component';

class BreedThumbnail extends Component<'div'> {
	constructor(data: BreedData) {
		super('div');
		this.element.classList.add('breedThumbnail');

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
}

export default BreedThumbnail;
