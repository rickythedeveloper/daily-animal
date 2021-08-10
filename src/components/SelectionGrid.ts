import OnOffButton from './OnOffButton';
import Component from '../models/Component';

const SelectionGrid = (titles: string[], onChange: (index: number, selected: boolean) => void): Component<'div'> => {
	const component = Component.new('div');
	component.element.classList.add('selectionGrid');
	const buttons = titles.map((title, index) => OnOffButton(title, (isOn) => onChange(index, isOn)));
	component.appendChildren(...buttons);
	return component;
};

export default SelectionGrid;
