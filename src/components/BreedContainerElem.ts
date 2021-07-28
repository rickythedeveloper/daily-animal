import { BreedData } from '../models/accessDogAPI';

interface BreedDataRenderer {
	breedData: BreedData;
	photoUrls: string[];
}

const BreedContainer = (): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.classList.add('breedContainer');
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

const MetricElement = (key: string, value: string | undefined): HTMLDivElement | null => {
	if (value === undefined) return null;
	const elem = document.createElement('div');
	elem.innerText = `${key}: ${value}`;
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

function appendChild(parent: HTMLElement, child: HTMLElement | null) {
	if (child) parent.appendChild(child);
}

const BreedContainerElem = ({ breedData, photoUrls }: BreedDataRenderer): HTMLDivElement => {
	const elem = BreedContainer();
	elem.appendChild(BreedNameElem(breedData.name || ''));
	appendChild(elem, MetricElement('Also known as', breedData.alt_names));
	appendChild(elem, MetricElement('Breed Group', breedData.breed_group));
	appendChild(elem, MetricElement('Life Span', breedData.life_span));
	elem.appendChild(BreedTemperamentElem(breedData.temperament || ''));
	elem.appendChild(ImagesContainer(photoUrls));
	return elem;
};

export default BreedContainerElem;
export { BreedDataRenderer };
