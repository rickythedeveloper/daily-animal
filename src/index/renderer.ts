// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedDetailWithPhotos } from '../components/BreedContainer';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import RandomBreedPage from '../pages/RandomBreedPage';
import { DogsData } from '../models/accessDogAPI';
import BreedGroupsPage from '../pages/BreedGroupsPage';
import navigation from '../models/navigation';
import navigationBar from '../components/NavigationBar';
import Component from '../models/Component';

const container = document.getElementById('container') as HTMLDivElement;

container.appendChild(navigationBar.element);

const contentContainer = new Component('div');
contentContainer.element.id = 'contentContainer';
container.appendChild(contentContainer.element);

const sideBar = SideBar([
	{ title: 'Breed', onClick: () => {} },
]);
const contentElem = Content();
contentContainer.children = [sideBar, contentElem];

navigation.contentComponent = contentElem;

async function getNextBreedData(): Promise<BreedDetailWithPhotos | null> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]) as BreedDetailWithPhotos | null;
}

async function getDogsData(): Promise<DogsData> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestDogsData]) as DogsData;
}

function showRandomBreedPage() {
	navigation.navigate(new RandomBreedPage(getNextBreedData));
}

function showStuff() {
	getDogsData().then((data) => {
		navigation.navigate(new BreedGroupsPage(data.breedsData, data.groupToIds));
	});
}

showStuff();
// showRandomBreedPage();
