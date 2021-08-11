import BreedThumbnail from '../components/BreedThumbnail';
import Component from '../models/Component';
import SelectionGrid from '../components/SelectionGrid';

import { BreedData } from '../models/accessDogAPI';

class BreedGroupsPage extends Component<'div'> {
	selectionGrid: SelectionGrid;

	groupNames: string[];

	thumbnailGridContainer: Component<'div'>;

	constructor(public breedData: BreedData[], public groupToIds: { [key: string]: string[] }) {
		super('div');
		this.element.classList.add('breedGroupsPage');
		this.groupNames = Object.keys(groupToIds);

		this.selectionGrid = new SelectionGrid(this.groupNames, () => {
			this.onSelectionChange();
		});
		this.appendChild(this.selectionGrid);

		this.thumbnailGridContainer = new Component('div');
		this.thumbnailGridContainer.element.classList.add('grid');
		this.appendChildren(this.thumbnailGridContainer);
	}

	onSelectionChange() {
		const { indicators } = this.selectionGrid;
		const selectedGroupNames: string[] = [];
		indicators.forEach((isSelected, index) => { if (isSelected) selectedGroupNames.push(this.groupNames[index]); });

		const selectedBreedIds: string[] = [];
		selectedGroupNames.forEach((name) => selectedBreedIds.push(...this.groupToIds[name]));
		const breedIds = new Set(selectedBreedIds);
		const sortedIds = Array.from(breedIds).sort();

		const thumbnails: Component<'div'>[] = [];
		sortedIds.forEach((id) => {
			for (let i = 0; i < this.breedData.length; i++) {
				const data = this.breedData[i];
				if (data.id === id) thumbnails.push(new BreedThumbnail(data));
			}
		});

		this.thumbnailGridContainer.children = thumbnails;
	}
}

export default BreedGroupsPage;
