import { loadData, saveData } from '../dataManager';
import type { Being } from '../orgHelper';

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
	authorityFigures: PlaceBeingRole[];
	languages: string;
	religion: string;
	currency: string;
	economy: string;
	organizations: number[];
	imageUrl: string;
	quests: number[];
	additionalInfo: { title: string; data: string }[];
	notes: string;
	shops: Shop[];
};

export type Shop = {
	name: string;
	description: string;
	owner: string;
	hasInventory: boolean;
	inventory: ShopItem[];
};

export type Item = {
	id: number; //if item id is -1, then its a custom item
	name: string;
	description: string;
	weight: string;
	type: string[]; //type is only used in the item list, not in the shop
};

//shops need to keep track of price and quantity, other keys aren't really important if getting from item list.

export type ShopItem = Item & {
	quantity: number;
	price: string;
};

export type PlaceBeingRole = Being & {
	role: string;
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
		imageUrl: '',
		quests: [],
		additionalInfo: [],
		notes: '',
		shops: []
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
	place.quests = parsed?.quests ?? place.quests;
	place.additionalInfo = parsed?.additionalInfo ?? place.additionalInfo;
	place.notes = parsed?.notes ?? place.notes;
	place.shops = parsed?.shops ?? place.shops;
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

//Items

export const saveItem = (item: Item): number => {
	let items = loadData('items') as Item[];

	if (items === undefined) {
		items = [];
	}

	const index = items.findIndex((n) => n.name === item.name);

	if (index === -1) {
		item.id = items.length > 0 ? items[items.length - 1].id + 1 : 1;
		items.push(item);
	} else {
		items[index] = item;
	}

	saveData('items', items);
	return item.id;
};

export const getItems = (): Item[] => {
	const items = loadData('items') as Item[];

	if (items === undefined) {
		return [];
	}

	return items;
};

export const getItem = (id: number): Item | undefined => {
	const items = loadData('items') as Item[];
	if (items === undefined) {
		return undefined;
	}
	return items.find((n) => n.id === id);
};

export const deleteItem = (name: string): Item[] => {
	let items = loadData('items') as Item[];
	if (items === undefined) {
		return [];
	}
	items = items.filter((n) => n.name !== name);
	saveData('items', items);
	return items;
};

export const newItem = (): Item => {
	return {
		id: 0,
		name: '',
		description: '',
		weight: '',
		type: []
	};
};

export const getRawItemList = (): string => {
	//return a json string of the item list
	const items = loadData('items') as Item[];
	if (items === undefined) {
		return '';
	}
	return JSON.stringify(items);
};

export const parseRawItemList = (rawItemList: string): void => {
	//parse a json string of the item list
	const parsed = JSON.parse(rawItemList);

	//go through each item and update ids
	parsed.forEach((item: Item, index: number) => {
		item.id = index + 1;
	});

	saveData('items', parsed);
};
