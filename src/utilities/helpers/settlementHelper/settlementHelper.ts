import { loadData, saveData } from '../dataManager';

export type Settlement = {
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

export const newSettlement = (): Settlement => {
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

export const handleSettlementPrompt = (settlement: Settlement, promptInput: string): Settlement => {
	const parsed = JSON.parse(promptInput);
	settlement.name = parsed?.name ?? settlement.name;
	settlement.population = parsed?.population ?? settlement.population;
	settlement.size = parsed?.size ?? settlement.size;
	settlement.type = parsed?.type ?? settlement.type;
	settlement.alignment = parsed?.alignment ?? settlement.alignment;
	settlement.description = parsed?.description ?? settlement.description;
	settlement.government = parsed?.government ?? settlement.government;
	settlement.authorityFigures = parsed?.authorityFigures ?? settlement.authorityFigures;
	settlement.languages = parsed?.languages ?? settlement.languages;
	settlement.religion = parsed?.religion ?? settlement.religion;
	settlement.currency = parsed?.currency ?? settlement.currency;
	settlement.economy = parsed?.economy ?? settlement.economy;
	settlement.organizations = parsed?.organizations ?? settlement.organizations;
	// settlement.imageURL = parsed?.imageURL ?? settlement.imageURL;
	settlement.quests = parsed?.quests ?? settlement.quests;
	settlement.additionalInfo = parsed?.additionalInfo ?? settlement.additionalInfo;
	settlement.notes = parsed?.notes ?? settlement.notes;
	return settlement;
};

// ====================================================================================================

export const saveSettlement = (settlement: Settlement): number => {
	let settlements = loadData('settlements') as Settlement[];

	if (settlements === undefined) {
		settlements = [];
	}

	const index = settlements.findIndex((n) => n.id === settlement.id);

	if (index === -1) {
		settlement.id = settlements.length > 0 ? settlements[settlements.length - 1].id + 1 : 1;
		settlements.push(settlement);
	} else {
		settlements[index] = settlement;
	}

	saveData('settlements', settlements);
	return settlement.id;
};

export const getSettlements = (): Settlement[] => {
	const settlements = loadData('settlements') as Settlement[];

	if (settlements === undefined) {
		return [];
	}

	return settlements;
};

export const getSettlement = (id: number): Settlement | undefined => {
	const settlements = loadData('settlements') as Settlement[];
	if (settlements === undefined) {
		return undefined;
	}
	return settlements.find((n) => n.id === id);
};

export const deleteSettlement = (id: number): Settlement[] => {
	let settlements = loadData('settlements') as Settlement[];
	if (settlements === undefined) {
		return [];
	}
	settlements = settlements.filter((n) => n.id !== id);
	saveData('settlements', settlements);
	return settlements;
};
