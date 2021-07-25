import axios from 'axios';

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

const apiKey = '0251c1a5-575b-4854-9bcc-fdb3f5228000';
const config = {
	headers: {
		'x-api-key': apiKey,
	},
};

async function getBreeds(): Promise<BreedData[]> {
	const url = 'https://api.thedogapi.com/v1/breeds';
	const { data }: { data: BreedData[] } = await axios.get(url, config);
	return data;
}

async function getBreedPhotos(breedId: string): Promise<Image[]> {
	const maxPhotos = 20;
	// const breedIdDummy = 1;
	const url = `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${maxPhotos}`;
	const { data }: { data: Image[] } = await axios.get(url, config);
	return data;
}

export { BreedData, getBreeds, getBreedPhotos };
