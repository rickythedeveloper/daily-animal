import BreedContainer, { BreedDetailWithPhotos } from '../components/BreedContainer';
import GenericButton from '../components/generic/GenericButton';
import Component from '../models/Component';
import Page from '../models/Page';

class RandomBreedPage extends Component<'div'> implements Page {
	get title() { return this.breedContainer.title; }

	private breedContainer: BreedContainer = new BreedContainer();

	constructor(public getNextBreedData: () => Promise<BreedDetailWithPhotos | null>) {
		super('div');
		const nextBreedButton = new GenericButton('Get next breed', 'blue', this.onNextButtonPress.bind(this));
		this.appendChildren(nextBreedButton, this.breedContainer);
	}

	showBreedData(data: BreedDetailWithPhotos) {
		this.breedContainer.breedData = data.breedData;
		this.breedContainer.photoUrls = data.photoUrls;
	}

	async onNextButtonPress() {
		const data = await this.getNextBreedData();
		if (data === null) return;
		this.showBreedData(data);
	}
}

export default RandomBreedPage;
