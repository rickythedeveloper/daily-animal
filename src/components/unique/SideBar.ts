import Component from '../../models/Component';
import SideBarRow, { SideBarRowProps } from './SideBarRow';

class SideBar extends Component<'div'> {
	constructor(content: SideBarRowProps[]) {
		super('div');
		this.element.id = 'sideBar';
		this.children = content.map((eachElem) => new SideBarRow(eachElem));
	}
}

export default SideBar;
