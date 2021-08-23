import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import navigation from '../models/navigation';
import container from '../components/unique/container';
import navigationBar from '../components/unique/navigationBar';
import navigationBarDummy from '../components/unique/navigationBarDummy';
import contentContainer from '../components/unique/contentContainer';
import content from '../components/unique/content';
import { DogsData } from '../models/accessDogAPI';
import BreedGroupsPage from '../pages/BreedGroupsPage';

const body = document.getElementById('body') as HTMLBodyElement;
body.appendChild(container.element);
container.children = [navigationBarDummy, navigationBar, contentContainer];
contentContainer.children = [content];

navigation.contentComponent = content;

async function getDogsData(): Promise<DogsData> {
	return await ipcRenderer.invoke(MessageType[MessageType.requestDogsData]) as DogsData;
}

function showStuff() {
	getDogsData().then((data) => {
		navigation.navigate(new BreedGroupsPage(data.breedsData, data.groupToIds));
	});
}

showStuff();
