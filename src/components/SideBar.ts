import Component from '../models/Component';

interface SideBarElementProps {
	title: string;
	onClick: (event: MouseEvent) => void;
}

const SideBarElement = ({ title, onClick }: SideBarElementProps): Component<'div'> => {
	const component = new Component('div');
	component.element.onclick = (event) => onClick(event);
	component.element.classList.add('sideBarText');
	component.element.innerText = title;
	return component;
};

const SideBar = (content: SideBarElementProps[]): Component<'div'> => {
	const component = new Component('div');
	component.element.id = 'sideBar';
	const children = content.map((eachElem) => SideBarElement(eachElem));
	children.forEach((child) => component.appendChild(child));
	return component;
};

export default SideBar;
