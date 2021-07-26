import { app, BrowserWindow, ipcMain } from 'electron';
import electronReload from 'electron-reload';
import path from 'path';
import { MessageType } from './constants';
import { BreedData, getBreeds, getBreedPhotos } from './accessDogAPI';
import { BreedDataRenderer } from './renderer';

const hardRefresh = false;
if (hardRefresh) {
	electronReload('../', {
		electron: path.join(__dirname, '../..', 'node_modules', '.bin', 'electron'),
	});
} else {
	electronReload('../', {});
}

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

// Store the array of BreedData in _breedData but access via breedsData().then(...) due to the nature of promise.
let _breedsData: BreedData[]; // eslint-disable-line no-underscore-dangle, @typescript-eslint/naming-convention
const breedsData = async (): Promise<BreedData[]> => {
	if (_breedsData === undefined) _breedsData = await getBreeds();
	return _breedsData;
};

let currentBreedIndex = 0; // index of breed to use in breedsData
const breedPhotoUrls: { [breedId: string]: string[] } = {};

/**
 * Load the phoro urls into breedPhotoUrls dictionary
 */
async function loadBreedPhotoUrls(breedId: string) {
	if (breedId in breedPhotoUrls) return;
	const images = await getBreedPhotos(breedId);
	const urls = images.map((image) => image.url);
	breedPhotoUrls[breedId] = urls;
}

/**
 * Get the phoro urls from breedPhotoUrls dictionary. Load the urls using the API if necessary.
 */
async function getBreedPhotoUrls(breedId: string): Promise<string[]> {
	if (breedId in breedPhotoUrls) return breedPhotoUrls[breedId];
	await loadBreedPhotoUrls(breedId);
	return breedPhotoUrls[breedId];
}

/**
 * Load the next photo urls via the API.
 * @param num The number of breeds to load the photo urls for.
 */
async function loadNextUrls(num: number) {
	for (let index = currentBreedIndex + 1; index <= currentBreedIndex + num; index += 1) {
		breedsData().then((data) => {
			const { id } = data[index];
			if (id !== undefined) loadBreedPhotoUrls(id);
		});
	}
}

ipcMain.handle(MessageType[MessageType.requestNextBreedData], async (): Promise<null | BreedDataRenderer> => {
	currentBreedIndex += 1;
	return breedsData().then(async (data): Promise<null | BreedDataRenderer> => {
		const breed = data[currentBreedIndex];
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
