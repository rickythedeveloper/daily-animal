import GenericButton, { changeStyle, getButtonStyle, GenericButtonStyleEnum } from './GenericButton';
import Component from '../models/Component';

const OnOffButton = (text: string, setState: (isOn: boolean) => void): Component<'div'> => {
	function toggle(event: MouseEvent) {
		const button = event.target as HTMLDivElement;
		const style = getButtonStyle(button);
		if (style === null) return;
		if (style === GenericButtonStyleEnum.default) {
			changeStyle(button, 'green');
			setState(true);
		} else {
			changeStyle(button, 'default');
			setState(false);
		}
	}
	const component = GenericButton(text, 'default', toggle);
	return component;
};

export default OnOffButton;
