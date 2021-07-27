import { BreedData } from '../index/accessDogAPI';

interface BreedDataRenderer {
	breedData: BreedData;
	photoUrls: string[];
}

const BreedContainer = (): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.id = 'breedContainer';
	elem.innerHTML = '';
	return elem;
};

const BreedNameElem = (name: string): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.classList.add('breedName', 'clickable');
	const breedName = name;
	elem.innerHTML = breedName;
	return elem;
};

const BreedTemperamentElem = (temperament: string): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.classList.add('breedTemperament');
	elem.innerHTML = temperament;
	return elem;
};

const ImageContainer = (url: string): HTMLDivElement => {
	const imgElem = document.createElement('img');
	imgElem.classList.add('breedImage');
	imgElem.src = url;

	const imgContainer = document.createElement('div');
	imgContainer.classList.add('imageContainer');
	imgContainer.appendChild(imgElem);

	return imgContainer;
};

const ImagesContainer = (photoUrls: string[]): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.classList.add('imagesContainer');
	// addPhotos(elem, photoUrls);

	photoUrls.forEach((url) => {
		elem.appendChild(ImageContainer(url));
	});
	return elem;
};

const BreedContainerElem = ({ breedData, photoUrls }: BreedDataRenderer): HTMLDivElement => {
	const elem = BreedContainer();
	elem.appendChild(BreedNameElem(breedData.name || ''));
	elem.appendChild(BreedTemperamentElem(breedData.temperament || ''));
	elem.appendChild(ImagesContainer(photoUrls));
	return elem;
};

export default BreedContainerElem;
export { BreedDataRenderer };
