const GenericButton = (text: string, onclick: (event: MouseEvent) => void) => {
	const elem = document.createElement('div');
	elem.onclick = onclick;
	elem.classList.add('genericButton');
	elem.innerText = text;
	return elem;
};

export default GenericButton;
