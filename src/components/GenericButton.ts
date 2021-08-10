import Component from "../models/Component";

enum GenericButtonStyleEnum {
	red,
	green,
	blue,
}

type GenericButtonStyle = keyof typeof GenericButtonStyleEnum;

const GenericButton = (text: string, style: GenericButtonStyle, onclick: (event: MouseEvent) => void): Component => {
	const component = Component.new('div');
	component.element.onclick = onclick;
	component.element.classList.add(`genericButton-${style}`);
	component.element.innerText = text;
	return component;
};

export default GenericButton;
