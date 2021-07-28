interface SideBarElementProps {
	title: string;
	onClick: (event: MouseEvent) => void;
}

const SideBarElement = ({ title, onClick }: SideBarElementProps) => {
	const elem = document.createElement('div');
	elem.onclick = (event) => onClick(event);
	elem.classList.add('sideBarText');
	elem.innerText = title;
	return elem;
};

const SideBar = (content: SideBarElementProps[]): HTMLDivElement => {
	const elem = document.createElement('div');
	elem.id = 'sideBar';
	const children = content.map((eachElem) => SideBarElement(eachElem));
	children.forEach((child) => elem.appendChild(child));
	return elem;
};

export default SideBar;
