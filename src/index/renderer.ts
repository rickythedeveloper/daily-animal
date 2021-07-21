// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';
import { BreedData } from './accessDogAPI';

function showBreedData(data: BreedData) {
	const breedContainer = document.getElementById('breedContainer');
	if (breedContainer === null) return;
	breedContainer.innerHTML = '';

	const breedNameElem = document.createElement('div');
	breedNameElem.classList.add('breedName', 'clickable');
	const breedName = data.name ? data.name : '';
	breedNameElem.innerHTML = breedName;

	const imgElem = document.createElement('img');
	imgElem.classList.add('breedImage');
	const imageData = data.image;
	if (imgElem !== null && imageData !== undefined) {
		imgElem.src = imageData.url;
	}

	const temparamentElem = document.createElement('div');
	temparamentElem.classList.add('breedTemperament');
	const desc = data.temperament;
	if (desc !== undefined) temparamentElem.innerHTML = desc;

	breedContainer.appendChild(breedNameElem);
	breedContainer.appendChild(temparamentElem);
	breedContainer.appendChild(imgElem);
}

ipcRenderer.on(MessageType[MessageType.returnBreedData], (event, data: BreedData) => {
	showBreedData(data);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAnotherBreed() {
	ipcRenderer.send(MessageType[MessageType.requestBreedData]);
}

getAnotherBreed();
