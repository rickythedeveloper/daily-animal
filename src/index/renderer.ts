// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import BreedContainerElem, { BreedDataRenderer } from '../components/BreedContainerElem';
import GenericButton from '../components/GenericButton';
import SideBar from '../components/SideBar';
import Content from '../components/Content';

const container = document.getElementById('container') as HTMLDivElement;
const sideBar = SideBar([
	{ title: 'Breed', onClick: () => {} },
]);
const contentElem = Content();
container.appendChild(sideBar);
container.appendChild(contentElem);

let breedContainer = document.createElement('div');
// eslint-disable-next-line @typescript-eslint/no-use-before-define
const nextBreedButton = GenericButton('Get next breed', onNextBreedPress);
contentElem.appendChild(nextBreedButton);
contentElem.appendChild(breedContainer);

async function getNextBreedData(): Promise<BreedDataRenderer | null> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]) as BreedDataRenderer | null;
}

function showBreedData(data: BreedDataRenderer | null) {
	if (data === null) return;
	const newBreedContainer = BreedContainerElem(data);
	// contentElem.appendChild(breedContainer);
	contentElem.replaceChild(newBreedContainer, breedContainer);
	breedContainer = newBreedContainer;
}

async function onNextBreedPress() {
	const data = await getNextBreedData();
	showBreedData(data);
}

onNextBreedPress();
