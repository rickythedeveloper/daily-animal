import BreedContainerElem, { BreedDataRenderer } from '../components/BreedContainerElem';
import GenericButton from '../components/GenericButton';
import Component from '../models/Component';

const RandomBreedPage = (getNextBreedData: () => Promise<BreedDataRenderer | null>): Component<'div'> => {
	const page = Component.new('div');
	let breedContainer = Component.new('div');

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
	page.appendChild(nextBreedButton);
	page.appendChild(breedContainer);

	return page;
};

export default RandomBreedPage;
