// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedData } from './accessDogAPI';

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

function showBreedData(data: BreedData, photoURLs: string[]) {
	const breedContainer = document.getElementById('breedContainer');
	if (breedContainer === null) return;
	breedContainer.innerHTML = '';

	const breedNameElem = document.createElement('div');
	breedNameElem.classList.add('breedName', 'clickable');
	const breedName = data.name ? data.name : '';
	breedNameElem.innerHTML = breedName;

	const imagesContainer = document.createElement('div');
	imagesContainer.classList.add('imagesContainer');
	addPhotos(imagesContainer, photoURLs);

	const temparamentElem = document.createElement('div');
	temparamentElem.classList.add('breedTemperament');
	const desc = data.temperament;
	if (desc !== undefined) temparamentElem.innerHTML = desc;

	breedContainer.appendChild(breedNameElem);
	breedContainer.appendChild(temparamentElem);
	breedContainer.appendChild(imagesContainer);
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

interface BreedDataRenderer {
	breedData: BreedData;
	photoUrls: string[];
}

async function getNextBreedData() {
	// eslint-disable-next-line max-len
	const nextBreedData: BreedDataRenderer | null = await ipcRenderer.invoke(MessageType[MessageType.requestNextBreedData]);
	if (nextBreedData === null) return;
	showBreedData(nextBreedData.breedData, nextBreedData.photoUrls);
}

configureSidebar();
getNextBreedData();

export { BreedDataRenderer }; // eslint-disable-line import/prefer-default-export
