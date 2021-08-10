// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedDataRenderer } from '../components/BreedContainerElem';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import RandomBreedPage from '../pages/RandomBreedPage';

const container = document.getElementById('container') as HTMLDivElement;
const sideBar = SideBar([
	{ title: 'Breed', onClick: () => {} },
]);
const contentElem = Content();
container.appendChild(sideBar);
container.appendChild(contentElem);

async function getNextBreedData(): Promise<BreedDataRenderer | null> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]) as BreedDataRenderer | null;
}

contentElem.appendChild(RandomBreedPage(getNextBreedData).element);
