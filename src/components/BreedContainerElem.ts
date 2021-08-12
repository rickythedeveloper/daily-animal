import { BreedData, NumberRange } from '../models/accessDogAPI';
import Component from '../models/Component';

interface BreedDataRenderer {
	breedData: BreedData;
	photoUrls: string[];
}

const BreedContainer = (): Component<'div'> => {
	const component = new Component('div');
	component.element.classList.add('breedContainer');
	component.element.innerHTML = '';
	return component;
};

const BreedNameElem = (name: string): Component<'div'> => {
	const component = new Component('div');
	component.element.classList.add('breedName', 'clickable');
	component.element.innerHTML = name;
	return component;
};

interface MetricData {
	iconPath: string;
	value: string | undefined;
}

function getSvgElement(filepath: string): Component<'img'> {
	const component = new Component('img');
	component.element.src = filepath;
	return component;
}

const MetricElement = (data: MetricData): Component<'div'> | null => {
	if (data.value === undefined) return null;
	const component = new Component('div');
	component.element.classList.add('metric');

	const icon = getSvgElement(data.iconPath);
	icon.element.classList.add('metricIcon');
	component.appendChild(icon);

	const valueComponent = new Component('div');
	valueComponent.element.innerText = data.value;
	valueComponent.element.classList.add('metricValue');
	component.appendChild(valueComponent);
	return component;
};

const Metrics = (data: MetricData[]): Component<'div'> => {
	const component = new Component('div');
	data.forEach((metric) => {
		const child = MetricElement(metric);
		if (child) component.appendChild(child);
	});
	return component;
};

const ImageContainer = (url: string): Component<'div'> => {
	const imgComponent = new Component('img');
	imgComponent.element.classList.add('breedImage');
	imgComponent.element.src = url;

	const imgContainerComponent = new Component('div');
	imgContainerComponent.element.classList.add('imageContainer');
	imgContainerComponent.appendChild(imgComponent);

	return imgContainerComponent;
};

const ImagesContainer = (photoUrls: string[]): Component<'div'> => {
	const component = new Component('div');
	component.element.classList.add('imagesContainer');
	photoUrls.forEach((url) => {
		component.appendChild(ImageContainer(url));
	});
	return component;
};

function rangeString(range: NumberRange | number): string {
	if (typeof range === 'number') {
	// if (range instanceof Number) {
		return `${range}`;
	}
	return `${(range as NumberRange).min} - ${(range as NumberRange).max}`;
}

const BreedContainerElem = ({ breedData, photoUrls }: BreedDataRenderer): Component<'div'> => {
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
		{ iconPath: '../assets/list_black_24dp.svg', value: breedData.temperaments?.join(', ') },
	]);
	elem.appendChild(metrics);
	elem.appendChild(ImagesContainer(photoUrls));
	return elem;
};

export default BreedContainerElem;
export { BreedDataRenderer };
