import { BreedData } from '../models/accessDogAPI';

const BreedThumbnail = (data: BreedData): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.classList.add('breedThumbnail');

	if (data.name === undefined) return elem;

	const breedNameElem = document.createElement('div');
	breedNameElem.classList.add('breedThumbnailName');
	breedNameElem.innerText = data.name || '';
	elem.appendChild(breedNameElem);

	const imageUrl = data.image?.url;
	if (imageUrl) {
		const imageElem = document.createElement('img');
		imageElem.src = imageUrl;
		imageElem.classList.add('breedThumbnailImage');
		elem.appendChild(imageElem);
	}

	return elem;
};

export default BreedThumbnail;
