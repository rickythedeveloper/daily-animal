import { BreedData, NumberRange } from '../models/accessDogAPI';

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

interface MetricData {
	iconPath: string;
	value: string | undefined;
}

function getSvgElement(filepath: string): HTMLImageElement {
	const elem = document.createElement('img');
	elem.src = filepath;
	return elem;
}

const MetricElement = (data: MetricData): HTMLDivElement | null => {
	if (data.value === undefined) return null;
	const elem = document.createElement('div');
	elem.classList.add('metric');

	const icon = getSvgElement(data.iconPath);
	icon.classList.add('metricIcon');
	elem.appendChild(icon);

	const valueElem = document.createElement('div');
	valueElem.innerText = data.value;
	valueElem.classList.add('metricValue');
	elem.appendChild(valueElem);
	return elem;
};

const Metrics = (data: MetricData[]): HTMLDivElement => {
	const elem = document.createElement('div');
	data.forEach((metric) => {
		const child = MetricElement(metric);
		if (child) elem.appendChild(child);
	});
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
	photoUrls.forEach((url) => {
		elem.appendChild(ImageContainer(url));
	});
	return elem;
};

function rangeString(range: NumberRange | number): string {
	if (typeof range === 'number') {
	// if (range instanceof Number) {
		return `${range}`;
	}
	return `${(range as NumberRange).min} - ${(range as NumberRange).max}`;
}

const BreedContainerElem = ({ breedData, photoUrls }: BreedDataRenderer): HTMLDivElement => {
	const elem = BreedContainer();
	elem.appendChild(BreedNameElem(breedData.name || ''));
	const metrics = Metrics([
		{ iconPath: '../assets/pets_black_24dp.svg', value: breedData.alt_names?.join(', ') },
		{ iconPath: '../assets/pets_black_24dp.svg', value: breedData.breed_group },
		{
			iconPath: '../assets/favorite_border_black_24dp.svg',
			value: breedData.life_span ? `${rangeString(breedData.life_span.yr)} years` : undefined,
		},
		{
			iconPath: '../assets/height_black_24dp.svg',
			value: breedData.height ? `${rangeString(breedData.height.cm)} cm` : undefined, // eslint-disable-line max-len
		},
		{ iconPath: '../assets/list_black_24dp.svg', value: breedData.temperament?.join(', ') },
	]);
	elem.appendChild(metrics);
	elem.appendChild(ImagesContainer(photoUrls));
	return elem;
};

export default BreedContainerElem;
export { BreedDataRenderer };
