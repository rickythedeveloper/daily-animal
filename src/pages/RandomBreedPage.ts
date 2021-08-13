import BreedContainer, { BreedDetailWithPhotos } from '../components/BreedContainer';
import GenericButton from '../components/GenericButton';
import Component from '../models/Component';

class RandomBreedPage extends Component<'div'> {
	private breedContainer: BreedContainer = new BreedContainer();

	constructor(public getNextBreedData: () => Promise<BreedDetailWithPhotos | null>) {
		super('div');
		const nextBreedButton = GenericButton('Get next breed', 'blue', this.onNextButtonPress.bind(this));
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
