import Component from '../models/Component';

export enum GenericButtonStyleEnum {
	red,
	green,
	blue,
	default,
}

type GenericButtonStyle = keyof typeof GenericButtonStyleEnum;
const genericButtonStyles = Object.keys(GenericButtonStyleEnum);

const GenericButton = (
	text: string,
	style: GenericButtonStyle,
	onclick: (event: MouseEvent) => void,
): Component<'div'> => {
	const component = Component.new('div');
	component.element.onclick = onclick;
	component.element.classList.add('genericButton', `genericButton-${style}`);
	component.element.innerText = text;
	return component;
};

export function getButtonStyle(genericButton: HTMLDivElement): GenericButtonStyleEnum | null {
	for (let i = 0; i < genericButtonStyles.length; i++) {
		const style = genericButtonStyles[i] as GenericButtonStyle;
		if (genericButton.classList.contains(`genericButton-${style}`)) {
			return GenericButtonStyleEnum[style];
		}
	}
	return null;
}

export function changeStyle(genericButton: HTMLDivElement, style: GenericButtonStyle) {
	genericButtonStyles.forEach((eachStyle) => {
		const styleClass = `genericButton-${eachStyle}`;
		if (genericButton.classList.contains(styleClass)) genericButton.classList.remove(styleClass);
	});
	genericButton.classList.add(`genericButton-${style}`);
}

export default GenericButton;
