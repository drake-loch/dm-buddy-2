import { loadData, saveData } from '../dataManager';

export type Lore = {
	id: number;
	title: string;
	type: string;
	description: string;
	imageUrl: string;
	additionalInfo: { title: string; data: string }[];
	notes: string;
};
export const newEmptyLore = (): Lore => {
	return {
		id: 0,
		title: '',
		type: '',
		description: '',
		imageUrl: '',
		additionalInfo: [],
		notes: ''
	};
};

export const handleLorePromptInput = (lore: Lore, promptInput: string): Lore => {
	const parsed = JSON.parse(promptInput);
	lore.title = parsed?.title ?? lore.title;
	lore.type = parsed?.type ?? lore.type;
	lore.description = parsed?.description ?? lore.description;
	lore.imageUrl = parsed?.imageUrl ?? lore.imageUrl;
	lore.additionalInfo = parsed?.additionalInfo ?? lore.additionalInfo;
	return lore;
};

//================================================================================================

export const saveLore = (loreToSave: Lore): number => {
	let lore = loadData('lore') as Lore[];

	if (lore === undefined) {
		lore = [];
	}

	const index = lore.findIndex((l) => l.id === loreToSave.id);

	if (index === -1) {
		loreToSave.id = lore.length > 0 ? lore[lore.length - 1].id + 1 : 1;
		lore.push(loreToSave);
	} else {
		lore[index] = loreToSave;
	}

	saveData('lore', lore);
	return loreToSave.id;
};

export const loadLore = (id: number): Lore | undefined => {
	const lore = loadData('lore') as Lore[];
	if (lore === undefined) {
		return undefined;
	}
	return lore.find((l) => l.id === id);
};

export const loadAllLore = (): Lore[] => {
	const lore = loadData('lore') as Lore[];
	if (lore === undefined) {
		return [];
	}
	return lore;
};

export const deleteLore = (id: number): Lore[] => {
	let lore = loadData('lore') as Lore[];
	if (lore === undefined) {
		return [];
	}
	lore = lore.filter((l) => l.id !== id);
	saveData('lore', lore);
	return lore;
};
