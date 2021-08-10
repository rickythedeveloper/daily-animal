import BreedContainerElem, { BreedDataRenderer } from '../components/BreedContainerElem';
import GenericButton from '../components/GenericButton';

const RandomBreedPage = (getNextBreedData: () => Promise<BreedDataRenderer | null>): HTMLDivElement => {
	const page = document.createElement('div');
	let breedContainer = document.createElement('div');

	function showBreedData(data: BreedDataRenderer | null) {
		if (data === null) return;
		const newBreedContainer = BreedContainerElem(data);
		page.replaceChild(newBreedContainer, breedContainer);
		breedContainer = newBreedContainer;
	}

	async function onNextBreedPress() {
		const data = await getNextBreedData();
		showBreedData(data);
	}

	const nextBreedButton = GenericButton('Get next breed', 'blue', onNextBreedPress);
	page.appendChild(nextBreedButton.element);
	page.appendChild(breedContainer);

	return page;
};

export default RandomBreedPage;
