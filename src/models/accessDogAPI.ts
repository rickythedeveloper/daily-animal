import axios from 'axios';

interface MeasurementObject {
	imperial: string;
	metric: string;
}
interface Image {
	height: number;
	id: string;
	url: string;
	width: number;
}
interface BreedDataAPI {
	alt_names?: string;
	bred_for?: string;
	breed_group?: string;
	country_code?: string;
	height?: MeasurementObject;
	id?: string;
	image?: Image;
	life_span?: string;
	name?: string;
	origin?: string;
	reference_image_id?: string;
	temperament?: string;
	weight?: MeasurementObject;
	wikipedia_url?: string;
}

export interface NumberRange {
	min: number;
	max: number;
}
interface Weight {
	lb: NumberRange | number;
	kg: NumberRange | number;
}
interface Height {
	cm: NumberRange | number;
	in: NumberRange | number;
}
interface TimeSpan {
	yr: NumberRange | number;
}
export interface BreedData {
	alt_names?: string[];
	bred_for?: string;
	breed_group?: string;
	country_code?: string;
	height: Height;
	id?: string;
	image?: Image;
	life_span?: TimeSpan;
	name?: string;
	origin?: string;
	reference_image_id?: string;
	temperaments?: string[];
	weight?: Weight;
	wikipedia_url?: string;
}

function splitWidhHiphen(str: string): number[] {
	let newStrings = str.split(' - ');
	if (newStrings.length === 1 && newStrings[0] === str) newStrings = str.split(' – ');
	const newNums = newStrings.map((newString) => Number(newString));
	return newNums;
}

function nums2Range(nums: number[]): NumberRange | number {
	switch (nums.length) {
		case 0:
			return -1;
		case 1:
			return nums[0];
		case 2:
			return { min: nums[0], max: nums[1] };
		default:
			return -1;
	}
}

function convertAPIDataToBackendData(breedDataAPI: BreedDataAPI): BreedData {
	const newData: any = {
		...breedDataAPI,
	};
	if (breedDataAPI.alt_names) newData.alt_names = breedDataAPI.alt_names.split(', ');
	if (breedDataAPI.height) {
		const cmHeights = splitWidhHiphen(breedDataAPI.height.metric);
		const inHeights = splitWidhHiphen(breedDataAPI.height.imperial);
		newData.height = {
			cm: nums2Range(cmHeights),
			in: nums2Range(inHeights),
		};
	}
	if (breedDataAPI.life_span) {
		const rangeString = breedDataAPI.life_span.replace(' years', '').replace(' Years', '');
		const nums = splitWidhHiphen(rangeString);
		newData.life_span = {
			yr: nums2Range(nums),
		};
	}
	if (breedDataAPI.temperament) newData.temperaments = breedDataAPI.temperament.split(', ');
	if (breedDataAPI.weight) {
		const kgWeights = splitWidhHiphen(breedDataAPI.weight.metric);
		const lbWeights = splitWidhHiphen(breedDataAPI.weight.imperial);
		newData.weight = {
			kg: nums2Range(kgWeights),
			lb: nums2Range(lbWeights),
		};
	}

	return newData;
}

const apiKey = '0251c1a5-575b-4854-9bcc-fdb3f5228000';
const config = {
	headers: {
		'x-api-key': apiKey,
	},
};

function organisedBreedsData(breeds: BreedData[]): {
	groupToIds: { [key: string]: string[] };
	unclassifiedBreedIds: string[];
	temperamentToIds: { [key: string]: string[] };
	idToBreed: { [key: string]: BreedData };
} {
	const groupToIds: { [key: string]: string[] } = {};
	const unclassifiedBreedIds: string[] = [];
	const temperamentToIds: { [key: string]: string[] } = {};
	const idToBreed: { [key: string]: BreedData } = {};
	breeds.forEach((breed) => {
		const { id, breed_group: group, temperaments } = breed;
		if (id) {
			if (group) {
				if (group in groupToIds) {
					groupToIds[group].push(id);
				} else {
					groupToIds[group] = [id];
				}
			} else {
				unclassifiedBreedIds.push(id);
			}

			if (temperaments) {
				temperaments.forEach((temperament) => {
					if (temperament in temperamentToIds) {
						temperamentToIds[temperament].push(id);
					} else {
						temperamentToIds[temperament] = [id];
					}
				});
			}

			idToBreed[id] = breed;
		}
	});

	return {
		groupToIds, unclassifiedBreedIds, temperamentToIds, idToBreed,
	};
}

export async function getBreeds(): Promise<BreedData[]> {
	const url = 'https://api.thedogapi.com/v1/breeds';
	const { data }: { data: BreedDataAPI[] } = await axios.get(url, config);
	const convertedData = data.map((breedDataAPI) => convertAPIDataToBackendData(breedDataAPI));
	const {
		idToBreed, unclassifiedBreedIds, temperamentToIds, groupToIds,
	} = organisedBreedsData(convertedData);
	return convertedData;
}

export async function getBreedPhotos(breedId: string): Promise<Image[]> {
	const maxPhotos = 20;
	// const breedIdDummy = 1;
	const url = `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${maxPhotos}`;
	const { data }: { data: Image[] } = await axios.get(url, config);
	return data;
}
