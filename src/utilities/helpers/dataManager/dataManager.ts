//All saving, loading, deleting of data will be done with local storage

import type { Character } from '../charHelper';
import type { NPC } from '../npcHelper/npcHelper';
import type { Being } from '../orgHelper';

//save
export const saveData = (key: string, data: any): void => {
	try {
		const serializedData = JSON.stringify(data);
		localStorage.setItem(key, serializedData);
	} catch (error) {
		console.error('Error saving data to local storage:', error);
	}
};
//load
export const loadData = (key: string): any | undefined => {
	try {
		const serializedData = localStorage.getItem(key);
		if (serializedData === null) {
			return undefined;
		}
		const data = JSON.parse(serializedData);
		return data;
	} catch (error) {
		console.error('Error loading data from local storage:', error);
		return undefined;
	}
};
//delete

//download and upload project files that are saved as a json file
//download
export const downloadData = (data: any, filename: string): void => {
	try {
		const serializedData = JSON.stringify(data);
		const blob = new Blob([serializedData], { type: 'application/json' });

		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = filename;

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	} catch (error) {
		console.error('Error downloading data:', error);
	}
};

export const downloadAllData = (): void => {
	const data = {
		npcs: loadData('npcs'),
		characters: loadData('characters'),
		settlements: loadData('places'),
		campaign: loadData('campaigns'),
		quests: loadData('quests'),
		session: loadData('sessions'),
		orgs: loadData('orgs')
	};
	downloadData(data, 'dm-tool-data.json');
};

export const uploadData = (data: any): void => {
	if (data.npcs) {
		saveData('npcs', data.npcs);
	}
	if (data.characters) {
		saveData('characters', data.characters);
	}
	if (data.settlements) {
		saveData('places', data.settlements);
	}
	if (data.campaign) {
		saveData('campaigns', data.campaign);
	}
	if (data.quests) {
		saveData('quests', data.quests);
	}
	if (data.session) {
		saveData('sessions', data.session);
	}
	if (data.orgs) {
		saveData('orgs', data.orgs);
	}
};

export async function uploadJSONFile<T>(fileInput: HTMLInputElement): Promise<T> {
	return new Promise((resolve, reject) => {
		if (!fileInput || fileInput.files?.length === 0) {
			reject('No file selected.');
			return;
		}

		const file = fileInput?.files ? fileInput.files[0] : undefined;
		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				try {
					const fileContents = event.target?.result as string;
					const jsonData = JSON.parse(fileContents) as T;
					resolve(jsonData);
				} catch (error) {
					reject('Error parsing JSON file: ' + error);
				}
			};

			reader.readAsText(file);
		} else {
			reject('No file selected.');
			return;
		}
	});
}

// ====================================================================================================

export const saveNPC = (npc: NPC): number => {
	let npcs = loadData('npcs') as NPC[];

	if (npcs === undefined) {
		npcs = [];
	}

	const index = npcs.findIndex((n) => n.id === npc.id);

	if (index === -1) {
		npc.id = npcs.length > 0 ? npcs[npcs.length - 1].id + 1 : 1; // [1, 2, 3] => [1, 2, 3, 4]
		npcs.push(npc);
	} else {
		npcs[index] = npc;
	}

	saveData('npcs', npcs);
	return npc.id;
};

export const getNPCs = (): NPC[] => {
	const npcs = loadData('npcs') as NPC[];

	if (npcs === undefined) {
		return [];
	}

	return npcs;
};

export const getNPC = (id: number): NPC | undefined => {
	const npcs = loadData('npcs') as NPC[];
	if (npcs === undefined) {
		return undefined;
	}
	return npcs.find((n) => n.id === id);
};

export const deleteNPC = (id: number): NPC[] => {
	let npcs = loadData('npcs') as NPC[];
	if (npcs === undefined) {
		return [];
	}
	const index = npcs.findIndex((n) => n.id === id);
	if (index !== -1) {
		npcs.splice(index, 1);
	}
	saveData('npcs', npcs);
	return npcs;
};

export const getNPCsAndChars = (): {
	id: number;
	fullName: string;
	type: 'npc' | 'character';
	imageUrl?: string;
}[] => {
	const npcs = getNPCs().map((n) => ({
		id: n.id,
		fullName: n.fullName,
		type: 'npc' as 'npc',
		imageURL: n.imageUrl
	}));

	const characters = getCharacters().map((c) => ({
		id: c.id,
		fullName: c.fullName,
		type: 'character' as 'character',
		imageURL: c.imageUrl
	}));
	return [...npcs, ...characters];
};

// ====================================================================================================
export const getCharacters = (): Character[] => {
	const characters = loadData('characters') as Character[];

	if (characters === undefined) {
		return [];
	}

	return characters;
};

export const getCharacter = (id: number): Character | undefined => {
	const characters = loadData('characters') as Character[];

	if (characters === undefined) {
		return undefined;
	}

	return characters.find((c) => c.id === id);
};

export const saveCharacter = (character: Character): number => {
	let characters = loadData('characters') as Character[];

	if (characters === undefined) {
		characters = [];
	}
	const index = characters.findIndex((c) => c.id === character.id);

	if (index === -1) {
		character.id = characters.length > 0 ? characters[characters.length - 1].id + 1 : 1; // [1, 2, 3] => [1, 2, 3, 4]
		characters.push(character);
	} else {
		characters[index] = character;
	}

	saveData('characters', characters);
	return character.id;
};

export const deleteCharacter = (id: number): Character[] => {
	let characters = loadData('characters') as Character[];

	if (characters === undefined) {
		return [];
	}

	const index = characters.findIndex((c) => c.id === id);

	if (index !== -1) {
		characters.splice(index, 1);
	}
	saveData('characters', characters);
	return characters;
};

// ====================================================================================================

export const getAllBeings = (): Being[] => {
	const npcs = getNPCs().map((n) => ({
		id: n.id,
		name: n.fullName,
		type: 'npc' as 'npc'
	}));
	const characters = getCharacters().map((c) => ({
		id: c.id,
		name: c.fullName,
		type: 'character' as 'character'
	}));
	return [...npcs, ...characters];
};
