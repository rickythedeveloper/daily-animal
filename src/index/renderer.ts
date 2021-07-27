// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import BreedContainerElem, { BreedDataRenderer } from '../components/BreedContainerElem';
import GenericButton from '../components/GenericButton';

const contentElem = document.getElementById('content') as HTMLDivElement | null;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
const nextBreedButton = GenericButton('Get next breed', onNextBreedPress);

function showBreedData(data: BreedDataRenderer | null) {
	if (contentElem === null) return;
	contentElem.innerHTML = '';
	contentElem.appendChild(nextBreedButton);
	if (data !== null) contentElem.appendChild(BreedContainerElem(data));
}

async function getNextBreedData(): Promise<BreedDataRenderer | null> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]) as BreedDataRenderer | null;
}

async function onNextBreedPress() {
	const data = await getNextBreedData();
	showBreedData(data);
}

function sideBarText(str: string, onClick: (ev: MouseEvent) => void): HTMLDivElement {
	const elem = document.createElement('div');
	elem.classList.add('sideBarText');
	elem.innerHTML = str;
	elem.onclick = (event) => onClick(event);
	return elem;
}

function configureSidebar() {
	const sideBar = document.getElementById('sideBar');
	if (sideBar === null) return;
	sideBar.appendChild(sideBarText('Random dog', () => {}));
	sideBar.appendChild(sideBarText('Breed', () => console.log('haha')));
}

configureSidebar();
showBreedData(null);
