import BreedThumbnail from '../components/BreedThumbnail';
import Component from '../models/Component';
import SelectionGrid from '../components/SelectionGrid';

import { BreedData } from '../models/accessDogAPI';

const BreedGroupsPage = (breedData: BreedData[], groupToIds: { [key: string]: string[] }): Component<'div'> => {
	const component = Component.new('div');
	component.element.classList.add('breedGroupsPage');

	const groupNames = Object.keys(groupToIds);
	component.appendChild(SelectionGrid(groupNames, (index, selected) => {
		console.log(`${groupNames[index]} is ${selected ? 'on' : 'off'}`);
	}));

	return component;
};

export default BreedGroupsPage;
