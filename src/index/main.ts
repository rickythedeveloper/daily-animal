import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import { MessageType } from './constants';
import { BreedData, getBreeds, getBreedPhotos } from './accessDogAPI';
import { BreedDataRenderer } from './renderer';

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 900,
		backgroundColor: 'white',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'layout.html'));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

let _breedsData: BreedData[]; // eslint-disable-line no-underscore-dangle, @typescript-eslint/naming-convention
const breedsData = async (): Promise<BreedData[]> => {
	if (_breedsData === undefined) {
		_breedsData = await getBreeds();
	}
	return _breedsData;
};

let currentIndex = 0;
const breedPhotoUrls: { [breedId: string]: string[] } = {};

async function loadBreedPhotoUrls(breedId: string) {
	if (breedId in breedPhotoUrls) return;
	const images = await getBreedPhotos(breedId);
	const urls = images.map((image) => image.url);
	breedPhotoUrls[breedId] = urls;
}

async function getBreedPhotoUrls(breedId: string): Promise<string[]> {
	if (breedId in breedPhotoUrls) return breedPhotoUrls[breedId];
	await loadBreedPhotoUrls(breedId);
	return breedPhotoUrls[breedId];
}

async function loadNextUrls(num: number) {
	for (let index = currentIndex + 1; index <= currentIndex + 1 + num; index += 1) {
		breedsData().then((data) => {
			const { id } = data[index];
			if (id !== undefined) loadBreedPhotoUrls(id);
		});
	}
}

ipcMain.handle(MessageType[MessageType.requestNextBreedData], async (): Promise<null | BreedDataRenderer> => {
	currentIndex += 1;
	return breedsData().then(async (data): Promise<null | BreedDataRenderer> => {
		const breed = data[currentIndex];
		const { id } = breed;
		if (id === undefined) return null;
		return getBreedPhotoUrls(id).then((urls): BreedDataRenderer => {
			const dataRenderer: BreedDataRenderer = {
				breedData: breed,
				photoUrls: urls,
			};
			loadNextUrls(1);
			return dataRenderer;
		});
	});
});
