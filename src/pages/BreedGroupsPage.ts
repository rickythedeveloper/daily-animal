import BreedThumbnail from '../components/BreedThumbnail';
import Component from '../models/Component';
import Page from '../models/Page';
import SelectionGrid from '../components/SelectionGrid';
import FloatingComponent from '../components/generic/FloatingComponent';

import { BreedData } from '../models/accessDogAPI';

class BreedGroupsPage extends Component<'div'> implements Page {
	title: string = 'Breed Groups';

	selectionGridFLoat: FloatingComponent;

	selectionGrid: SelectionGrid;

	groupNames: string[];

	get selectedGroupNames(): string[] {
		const { indicators } = this.selectionGrid;
		const selectedGroupNames: string[] = [];
		indicators.forEach((isSelected, index) => { if (isSelected) selectedGroupNames.push(this.groupNames[index]); });
		return selectedGroupNames;
	}

	thumbnailGridContainer: Component<'div'>;

	constructor(public breedData: BreedData[], public groupToIds: { [key: string]: string[] }) {
		super('div');
		this.element.classList.add('breedGroupsPage');
		this.groupNames = Object.keys(groupToIds);

		this.selectionGrid = new SelectionGrid(this.groupNames);
		this.selectionGridFLoat = new FloatingComponent();
		this.selectionGridFLoat.mainComponent = this.selectionGrid;

		this.selectionGrid.addOnChangeListener('breedGroupsPage', () => {
			this.onSelectionChange();
			this.onChange();
		});

		this.thumbnailGridContainer = new Component('div');
		this.thumbnailGridContainer.element.classList.add('grid');

		this.children = [this.selectionGridFLoat, this.thumbnailGridContainer];
	}

	onSelectionChange() {
		const selectedBreedIds: string[] = [];
		this.selectedGroupNames.forEach((name) => selectedBreedIds.push(...this.groupToIds[name]));
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
