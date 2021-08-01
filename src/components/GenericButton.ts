enum GenericButtonStyleEnum {
	red,
	green,
	blue,
}

type GenericButtonStyle = keyof typeof GenericButtonStyleEnum;

const GenericButton = (text: string, style: GenericButtonStyle, onclick: (event: MouseEvent) => void) => {
	const elem = document.createElement('div');
	elem.onclick = onclick;
	elem.classList.add(`genericButton-${style}`);
	elem.innerText = text;
	return elem;
};

export default GenericButton;
