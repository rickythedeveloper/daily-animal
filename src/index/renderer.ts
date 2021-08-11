// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedDataRenderer } from '../components/BreedContainerElem';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import RandomBreedPage from '../pages/RandomBreedPage';
import BreedThumbnail from '../components/BreedThumbnail';
import { DogsData } from '../models/accessDogAPI';
import BreedGroupsPage from '../pages/BreedGroupsPage';
import Component from '../models/Component';

const container = document.getElementById('container') as HTMLDivElement;
const sideBar = SideBar([
	{ title: 'Breed', onClick: () => {} },
]);
const contentElem = Content();
container.appendChild(sideBar);
container.appendChild(contentElem);

let page = new Component('div');
contentElem.appendChild(page.element);

function showNewPage(newPage: Component<'div'>) {
	contentElem.replaceChild(newPage.element, page.element);
	page = newPage;
}

async function getNextBreedData(): Promise<BreedDataRenderer | null> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]) as BreedDataRenderer | null;
}

async function getDogsData(): Promise<DogsData> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestDogsData]) as DogsData;
}

function showRandomBreedPage() {
	showNewPage(RandomBreedPage(getNextBreedData));
}

function showStuff() {
	getDogsData().then((data) => {
		showNewPage(new BreedGroupsPage(data.breedsData, data.groupToIds));
	});
	// getNextBreedData().then((breed) => {
	// 	if (breed !== null) showNewPage(BreedThumbnail(breed.breedData));
	// });
}

showStuff();
