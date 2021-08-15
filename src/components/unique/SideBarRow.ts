import Component from '../../models/Component';

interface SideBarRowProps {
	title: string;
	onClick: (event: MouseEvent) => void;
}

class SideBarRow extends Component<'div'> {
	constructor({ title, onClick }: SideBarRowProps) {
		super('div');
		this.element.onclick = (event) => onClick(event);
		this.element.classList.add('sideBarText');
		this.element.innerText = title;
	}
}

export default SideBarRow;
export { SideBarRowProps };
