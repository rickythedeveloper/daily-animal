import axios from 'axios';
import { getRandomElement } from '../utils';

interface Length {
	imperial: string;
	metric: string;
}

interface Image {
	height: number;
	id: string;
	url: string;
	width: number;
}

export interface BreedData {
	alt_names?: string;
	bred_for?: string;
	breed_group?: string;
	country_code?: string;
	height?: Length;
	id?: string;
	image?: Image;
	life_span?: string;
	name?: string;
	origin?: string;
	reference_image_id?: string;
	temperament?: string;
	weight?: Length;
	wikipedia_url?: string;
}

const apiKey = '0251c1a5-575b-4854-9bcc-fdb3f5228000';
const config = {
	headers: {
		'x-api-key': apiKey,
	},
};
let breedsData: BreedData[];

async function getBreeds(): Promise<BreedData[]> {
	const url = 'https://api.thedogapi.com/v1/breeds';
	const { data } = await axios.get(url, config);
	return data;
}

export async function getRandomDogData(): Promise<BreedData> {
	if (breedsData === undefined) breedsData = await getBreeds();
	const randomBreed = getRandomElement(breedsData);
	return randomBreed;
}

async function getBreedPhotos(breedId: string): Promise<Image[]> {
	const maxPhotos = 20;
	// const breedIdDummy = 1;
	const url = `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${maxPhotos}`;
	const { data } = await axios.get(url, config);
	return data;
}

export async function getBreedPhotoURLs(breedId: string): Promise<string[]> {
	const data = await getBreedPhotos(breedId);
	const urls = data.map((image) => image.url);
	return urls;
}
