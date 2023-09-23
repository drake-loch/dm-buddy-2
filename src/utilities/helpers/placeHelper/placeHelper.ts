import { loadData, saveData } from '../dataManager';

export type Place = {
	id: number;
	name: string;
	population: number | undefined;
	size: string;
	type: string;
	alignment: string;
	places: number[];
	description: string;
	government: string;
	authorityFigures: {
		id: number;
		role: string;
		type: 'npc' | 'character';
		isLinked: boolean;
		name?: string;
	}[];
	languages: string;
	religion: string;
	currency: string;
	economy: string;
	organizations: number[];
	imageURL: string;
	quests: { name: string; description: string; id: number }[];
	additionalInfo: { title: string; data: string }[];
	notes: string;
};

export const newPlace = (): Place => {
	return {
		id: 0,
		name: '',
		population: undefined,
		size: '',
		type: '',
		alignment: '',
		places: [],
		description: '',
		government: '',
		authorityFigures: [],
		languages: '',
		religion: '',
		currency: '',
		economy: '',
		organizations: [],
		imageURL: '',
		quests: [],
		additionalInfo: [],
		notes: ''
	};
};

export const handlePlacePrompt = (place: Place, promptInput: string): Place => {
	const parsed = JSON.parse(promptInput);
	place.name = parsed?.name ?? place.name;
	place.population = parsed?.population ?? place.population;
	place.size = parsed?.size ?? place.size;
	place.type = parsed?.type ?? place.type;
	place.alignment = parsed?.alignment ?? place.alignment;
	place.description = parsed?.description ?? place.description;
	place.government = parsed?.government ?? place.government;
	place.authorityFigures = parsed?.authorityFigures ?? place.authorityFigures;
	place.languages = parsed?.languages ?? place.languages;
	place.religion = parsed?.religion ?? place.religion;
	place.currency = parsed?.currency ?? place.currency;
	place.economy = parsed?.economy ?? place.economy;
	place.organizations = parsed?.organizations ?? place.organizations;
	// place.imageURL = parsed?.imageURL ?? place.imageURL;
	place.quests = parsed?.quests ?? place.quests;
	place.additionalInfo = parsed?.additionalInfo ?? place.additionalInfo;
	place.notes = parsed?.notes ?? place.notes;
	return place;
};

// ====================================================================================================

export const savePlace = (place: Place): number => {
	let places = loadData('places') as Place[];

	if (places === undefined) {
		places = [];
	}

	const index = places.findIndex((n) => n.id === place.id);

	if (index === -1) {
		place.id = places.length > 0 ? places[places.length - 1].id + 1 : 1;
		places.push(place);
	} else {
		places[index] = place;
	}

	saveData('places', places);
	return place.id;
};

export const getPlaces = (): Place[] => {
	const places = loadData('places') as Place[];

	if (places === undefined) {
		return [];
	}

	return places;
};

export const getPlace = (id: number): Place | undefined => {
	const places = loadData('places') as Place[];
	if (places === undefined) {
		return undefined;
	}
	return places.find((n) => n.id === id);
};

export const deletePlace = (id: number): Place[] => {
	let places = loadData('places') as Place[];
	if (places === undefined) {
		return [];
	}
	places = places.filter((n) => n.id !== id);
	saveData('places', places);
	return places;
};
