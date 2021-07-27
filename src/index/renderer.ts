// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedData } from './accessDogAPI';
import BreedContainerElem, { BreedDataRenderer } from '../components/BreedContainerElem';

async function getNextBreedData() {
	// eslint-disable-next-line max-len
	const nextBreedData: BreedDataRenderer | null = await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]);
	if (nextBreedData === null) return;
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	showBreedData(nextBreedData);
}

const contentElem = (() => {
	const elem = document.getElementById('content');
	if (elem === null) {
		console.log('Could not find content element...');
		return null;
	}
	return elem;
})();

const nextBreedButton = (() => {
	const button = document.createElement('button');
	button.onclick = getNextBreedData;
	button.classList.add('ourButton');
	button.innerText = 'Get next breed';
	return button;
})();

function showBreedData(data: BreedDataRenderer) {
	if (contentElem === null) return;
	contentElem.innerHTML = '';
	contentElem.appendChild(nextBreedButton);
	contentElem.appendChild(BreedContainerElem(data));
}

function addNextBreedButton() {
	if (contentElem === null) return;
	contentElem.appendChild(nextBreedButton);
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
addNextBreedButton();
