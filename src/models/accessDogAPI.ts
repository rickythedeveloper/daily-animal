import axios from 'axios';

enum MeasurementType {
	length,
	weight,
}
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

enum Unit {
	cm,
	inch,
	year,
	lb,
	kg,
}
interface MeasurementRange {
	min: number;
	max: number | undefined;
	unit: Unit;
}
interface BreedData {
	alt_names?: string[];
	bred_for?: string;
	breed_group?: string;
	country_code?: string;
	height?: MeasurementRange[];
	id?: string;
	image?: Image;
	life_span?: MeasurementRange;
	name?: string;
	origin?: string;
	reference_image_id?: string;
	temperament?: string[];
	weight?: MeasurementRange[];
	wikipedia_url?: string;
}

function splitWidhHiphen(str: string): string[] {
	let newStr = str.split(' - ');
	if (newStr.length === 0) newStr = str.split(' – ');
	return newStr;
}

function measurementObject2MeasurementRanges(length: MeasurementObject, type: MeasurementType): MeasurementRange[] {
	const strings = [length.imperial, length.metric];
	const units = type === MeasurementType.length ? [Unit.inch, Unit.cm] : [Unit.lb, Unit.kg];

	const measurements = strings.map((str, index) => {
		const numsStr = splitWidhHiphen(str);
		const nums = numsStr.map((numStr) => Number(numStr));
		const measurement: MeasurementRange = {
			min: nums[0],
			max: nums[1],
			unit: units[index],
		};
		return measurement;
	});
	return measurements;
}

function lifespan2Measurement(lifespan: string): MeasurementRange | null {
	const str = lifespan.replace(' years', '');
	const numsString = splitWidhHiphen(str);
	const nums = numsString.map((numStr) => Number(numStr));
	const measurement: MeasurementRange = {
		min: nums[0],
		max: nums[1],
		unit: Unit.year,
	};
	return measurement;
}

function convertAPIDataToBackendData(breedDataAPI: BreedDataAPI): BreedData {
	const newData: any = {
		...breedDataAPI,
	};
	if (breedDataAPI.alt_names) newData.alt_names = breedDataAPI.alt_names.split(', ');
	if (breedDataAPI.height) newData.height = measurementObject2MeasurementRanges(breedDataAPI.height, MeasurementType.length); // eslint-disable-line max-len
	if (breedDataAPI.life_span) newData.life_span = lifespan2Measurement(breedDataAPI.life_span);
	if (breedDataAPI.temperament) newData.temperament = breedDataAPI.temperament.split(', ');
	if (breedDataAPI.weight) newData.weight = measurementObject2MeasurementRanges(breedDataAPI.weight, MeasurementType.weight); // eslint-disable-line max-len

	return newData;
}

const apiKey = '0251c1a5-575b-4854-9bcc-fdb3f5228000';
const config = {
	headers: {
		'x-api-key': apiKey,
	},
};

async function getBreeds(): Promise<BreedData[]> {
	const url = 'https://api.thedogapi.com/v1/breeds';
	const { data }: { data: BreedDataAPI[] } = await axios.get(url, config);
	const convertedData = data.map((breedDataAPI) => convertAPIDataToBackendData(breedDataAPI));
	return convertedData;
}

async function getBreedPhotos(breedId: string): Promise<Image[]> {
	const maxPhotos = 20;
	// const breedIdDummy = 1;
	const url = `https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=${maxPhotos}`;
	const { data }: { data: Image[] } = await axios.get(url, config);
	return data;
}

export {
	BreedData, getBreeds, getBreedPhotos, Unit, MeasurementRange,
};
