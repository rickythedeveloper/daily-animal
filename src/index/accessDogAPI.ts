import axios from 'axios';

const url = 'https://api.thedogapi.com/v1/breeds';

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

interface BreedData {
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

let breedsData: BreedData[];

async function getBreeds(): Promise<BreedData[]> {
	const { data } = await axios.get(url);
	return data;
}

function getRandomInt(max: number) {
	return Math.floor(Math.random() * (max + 1));
}

function getRandomElement<T>(array: Array<T>): T {
	return array[getRandomInt(array.length - 1)];
}

async function getRandomDogData(): Promise<BreedData> {
	if (breedsData === undefined) breedsData = await getBreeds();
	const randomBreed = getRandomElement(breedsData);
	return randomBreed;
}

export { getRandomDogData, BreedData };
