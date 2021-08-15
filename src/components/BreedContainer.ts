import { BreedData, NumberRange } from '../models/accessDogAPI';
import Component from '../models/Component';

interface BreedDetailWithPhotos {
	breedData: BreedData;
	photoUrls: string[];
}

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

const SvgComponent = (filepath: string): Component<'img'> => {
	const component = new Component('img');
	component.element.src = filepath;
	return component;
};

const MetricComponent = (data: MetricData): Component<'div'> | null => {
	if (data.value === undefined) return null;
	const component = new Component('div');
	component.element.classList.add('metric');

	const icon = SvgComponent(data.iconPath);
	icon.element.classList.add('metricIcon');

	const valueComponent = new Component('div');
	valueComponent.element.innerText = data.value;
	valueComponent.element.classList.add('metricValue');

	component.children = [icon, valueComponent];
	return component;
};

const MetricsContainer = (data: MetricData[]): Component<'div'> => {
	const component = new Component('div');
	data.forEach((metric) => {
		const child = MetricComponent(metric);
		if (child) component.appendChild(child);
	});
	return component;
};

const ImageComponent = (url: string): Component<'div'> => {
	const imgComponent = new Component('img');
	imgComponent.element.classList.add('breedImage');
	imgComponent.element.src = url;

	const imgContainerComponent = new Component('div');
	imgContainerComponent.element.classList.add('imageContainer');
	imgContainerComponent.children = [imgComponent];

	return imgContainerComponent;
};

const ImagesContainer = (photoUrls: string[]): Component<'div'> => {
	const component = new Component('div');
	component.element.classList.add('imagesContainer');
	component.children = photoUrls.map((url) => ImageComponent(url));
	return component;
};

function rangeString(range: NumberRange | number): string {
	if (typeof range === 'number') {
		return `${range}`;
	}
	return `${(range as NumberRange).min} - ${(range as NumberRange).max}`;
}

class BreedContainer extends Component<'div'> {
	private breedDataComponents: Component<any>[];

	private photoUrlsComponents: Component<any>[];

	_breedData?: BreedData;

	get breedData() { return this._breedData; }

	set breedData(value: BreedData | undefined) {
		this._breedData = value;

		let nameComponent: Component<'div'>;
		let metricsComponent: Component<'div'>;

		if (this.breedData === undefined) {
			const { nameComponent: name, metricsComponent: metrics } = BreedContainer.dummyBreedDataComponents();
			nameComponent = name;
			metricsComponent = metrics;
		} else {
			nameComponent = BreedNameElem(this.breedData.name || '');
			metricsComponent = MetricsContainer([
				{ iconPath: '../assets/pets_black_24dp.svg', value: this.breedData.alt_names?.join(', ') },
				{ iconPath: '../assets/pets_black_24dp.svg', value: this.breedData.breed_group },
				{
					iconPath: '../assets/favorite_border_black_24dp.svg',
					value: this.breedData.life_span ? `${rangeString(this.breedData.life_span.yr)} years` : undefined,
				},
				{
					iconPath: '../assets/height_black_24dp.svg',
					value: this.breedData.height ? `${rangeString(this.breedData.height.cm)} cm` : undefined, // eslint-disable-line max-len
				},
				{ iconPath: '../assets/list_black_24dp.svg', value: this.breedData.temperaments?.join(', ') },
			]);
		}

		const newBreedDataComponents = [nameComponent, metricsComponent];
		if (this.breedDataComponents.length === newBreedDataComponents.length) {
			this.breedDataComponents.forEach((oldComponent, index) => {
				const newComponent = newBreedDataComponents[index];
				this.replaceChild(newComponent, oldComponent);
			});
		}

		this.breedDataComponents = newBreedDataComponents;
	}

	_photoUrls?: string[];

	get photoUrls() { return this._photoUrls; }

	set photoUrls(value: string[] | undefined) {
		this._photoUrls = value;

		let imagesComponent: Component<'div'>;
		if (this.photoUrls === undefined) {
			const { imagesComponent: imagesComp } = BreedContainer.dummyImagesComponents();
			imagesComponent = imagesComp;
		} else {
			imagesComponent = ImagesContainer(this.photoUrls);
		}

		const newPhotoUrlsComponents = [imagesComponent];

		if (this.photoUrlsComponents.length === newPhotoUrlsComponents.length) {
			this.photoUrlsComponents.forEach((oldComponent, index) => {
				const newComponent = newPhotoUrlsComponents[index];
				this.replaceChild(newComponent, oldComponent);
			});
		}

		this.photoUrlsComponents = newPhotoUrlsComponents;
	}

	constructor(breedData?: BreedData, photoUrls?: string[]) {
		super('div');
		this.element.classList.add('breedContainer');

		const { nameComponent, metricsComponent } = BreedContainer.dummyBreedDataComponents();
		const { imagesComponent } = BreedContainer.dummyImagesComponents();
		this.breedDataComponents = [nameComponent, metricsComponent];
		this.photoUrlsComponents = [imagesComponent];
		this.appendChildren(nameComponent, metricsComponent, imagesComponent);

		if (breedData) this.breedData = breedData;
		if (photoUrls) this.photoUrls = photoUrls;
	}

	private static dummyBreedDataComponents() {
		const nameComponent = new Component('div');
		const metricsComponent = new Component('div');
		return { nameComponent, metricsComponent };
	}

	private static dummyImagesComponents() {
		const imagesComponent = new Component('div');
		return { imagesComponent };
	}
}

export default BreedContainer;
export { BreedDetailWithPhotos };
