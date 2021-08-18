import GenericButton from './GenericButton';

class OnOffButton extends GenericButton {
	_isOn: boolean;

	get isOn() { return this._isOn; }

	set isOn(value: boolean) {
		this._isOn = value;
		this.buttonStyle = value ? 'green' : 'default';
		this.onChange();
	}

	constructor(text: string, initialState: boolean = false) {
		super(text, 'default', () => {});

		this.onclick = () => { this.isOn = !this.isOn; };
		this._isOn = initialState;
	}

	setState(isOn: boolean) { this.isOn = isOn; }
}

export default OnOffButton;
