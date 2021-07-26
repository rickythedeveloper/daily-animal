// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedData } from './accessDogAPI';

interface BreedDataRenderer {
	breedData: BreedData;
	photoUrls: string[];
}

async function getNextBreedData() {
	// eslint-disable-next-line max-len
	const nextBreedData: BreedDataRenderer | null = await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]);
	if (nextBreedData === null) return;
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	showBreedData(nextBreedData.breedData, nextBreedData.photoUrls);
}

function addPhotos(imagesContainer: HTMLElement, urls: string[]) {
	if (imagesContainer === null) return;

	urls.forEach((url) => {
		const imgElem = document.createElement('img');
		imgElem.classList.add('breedImage');
		imgElem.src = url;

		const imgContainer = document.createElement('div');
		imgContainer.classList.add('imageContainer');
		imgContainer.appendChild(imgElem);
		imagesContainer.appendChild(imgContainer);
	});
}

const breedContainer = (() => {
	const elem = document.createElement('div');
	elem.id = 'breedContainer';
	elem.innerHTML = '';
	return elem;
})();

const imagesContainer = (photoUrls: string[]) => {
	const elem = document.createElement('div');
	elem.classList.add('imagesContainer');
	addPhotos(elem, photoUrls);
	return elem;
};

const breedNameElem = (name: string) => {
	const elem = document.createElement('div');
	elem.classList.add('breedName', 'clickable');
	const breedName = name;
	elem.innerHTML = breedName;
	return elem;
};

const breedTemperamentElem = (temperament: string) => {
	const elem = document.createElement('div');
	elem.classList.add('breedTemperament');
	elem.innerHTML = temperament;
	return elem;
};

const nextBreedButton = (() => {
	const button = document.createElement('button');
	button.onclick = getNextBreedData;
	button.classList.add('ourButton');
	button.innerText = 'Get next breed';
	return button;
})();

function showBreedData(data: BreedData, photoURLs: string[]) {
	const contentElem = document.getElementById('content');
	if (contentElem === null) {
		console.log('Could not find content element...');
		return;
	}

	contentElem.innerHTML = '';
	contentElem.appendChild(breedContainer);
	contentElem.appendChild(nextBreedButton);

	breedContainer.innerHTML = '';
	breedContainer.appendChild(breedNameElem(data.name || ''));
	breedContainer.appendChild(breedTemperamentElem(data.temperament || ''));
	breedContainer.appendChild(imagesContainer(photoURLs));
}

function sideBarText(str: string): HTMLDivElement {
	const elem = document.createElement('div');
	elem.classList.add('sideBarText');
	elem.innerHTML = str;
	elem.onclick = () => console.log('hey');
	return elem;
}

function configureSidebar() {
	const sideBar = document.getElementById('sideBar');
	if (sideBar === null) return;
	sideBar.appendChild(sideBarText('Random dog'));
}

configureSidebar();
getNextBreedData();

export { BreedDataRenderer }; // eslint-disable-line import/prefer-default-export
