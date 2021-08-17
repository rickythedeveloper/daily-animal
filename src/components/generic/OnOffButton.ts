import GenericButton, { GenericButtonStyleEnum } from './GenericButton';

class OnOffButton extends GenericButton {
	constructor(text: string, public setState: (isOn: boolean) => void) {
		super(text, 'default', () => {});

		this.onclick = this.toggle.bind(this);
	}

	toggle() {
		if (GenericButtonStyleEnum[this.buttonStyle] === GenericButtonStyleEnum.default) {
			this.buttonStyle = 'green';
			this.setState(true);
		} else {
			this.buttonStyle = 'default';
			this.setState(false);
		}
	}
}

export default OnOffButton;
