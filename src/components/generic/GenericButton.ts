import Component from '../../models/Component';

export enum GenericButtonStyleEnum {
	red,
	green,
	blue,
	default,
}

type GenericButtonStyle = keyof typeof GenericButtonStyleEnum;
// const genericButtonStyles = Object.keys(GenericButtonStyleEnum);

class GenericButton extends Component<'div'> {
	_buttonStyle: GenericButtonStyle;

	get buttonStyle() { return this._buttonStyle; }

	set buttonStyle(value: GenericButtonStyle) {
		const currentClass = `genericButton-${this.buttonStyle}`;
		if (this.element.classList.contains(currentClass)) this.element.classList.remove(currentClass);
		const newClass = `genericButton-${value}`;
		this.element.classList.add(newClass);

		this._buttonStyle = value;
	}

	_onclick: (event: MouseEvent) => void = () => {};

	get onclick() { return this._onclick; }

	set onclick(value: (event: MouseEvent) => void) {
		this._onclick = value;
		this.element.onclick = this.onclick;
	}

	constructor(text: string, style: GenericButtonStyle, onclick: (event: MouseEvent) => void) {
		super('div');
		this.onclick = onclick;
		this.element.classList.add('genericButton', `genericButton-${style}`);
		this.element.innerText = text;

		this._buttonStyle = style;
	}
}

export default GenericButton;
