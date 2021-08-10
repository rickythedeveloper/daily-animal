import { BreedData } from '../models/accessDogAPI';
import Component from '../models/Component';

const BreedThumbnail = (data: BreedData): Component<'div'> => {
	const component = Component.new('div');
	component.element.classList.add('breedThumbnail');

	if (data.name === undefined) return component;

	const breedNameComponent = Component.new('div');
	breedNameComponent.element.classList.add('breedThumbnailName');
	breedNameComponent.element.innerText = data.name || '';
	component.appendChild(breedNameComponent);

	const imageUrl = data.image?.url;
	if (imageUrl) {
		const imageComponent = Component.new('img');
		imageComponent.element.src = imageUrl;
		imageComponent.element.classList.add('breedThumbnailImage');
		component.appendChild(imageComponent);
	}

	return component;
};

export default BreedThumbnail;
