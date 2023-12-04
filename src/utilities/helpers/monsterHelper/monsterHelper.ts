import { newAbilities, type Ability } from '../charHelper';
import { loadData, saveData } from '../dataManager';
import type { Dice } from '../npcHelper/npcHelper';

export type Monster = {
	id: number;
	name: string;
	description: string;
	type: string;
	alignment: string;
	size: string;
	passivePerception: string;
	sight: string;
	armourClass: { value: number; source: string };
	abilities: Ability[];
	initiative: number;
	speed: string;
	hitPoints: { base: number; current: number; dice: string; modifier: number };
	hitDice: string;
	notes: string;
	languages: string;
	difficulty: string;
	savingThrows: string;
	skills: string;
	immunity: string;
	resistances: string;
	vulnerabilities: string;
	additionalInfo: { title: string; data: string }[];
	imageUrl: string;
	actions: { title: string; desc: string; dice: Dice }[];
};

export const newEmptyMonster = (): Monster => {
	return {
		id: 0,
		name: '',
		description: '',
		type: '',
		alignment: '',
		size: '',
		passivePerception: '',
		sight: '',
		armourClass: { value: 0, source: '' },
		abilities: newAbilities(),
		initiative: 0,
		speed: '',
		hitPoints: { base: 0, current: 0, dice: '', modifier: 0 },
		hitDice: '',
		notes: '',
		languages: '',
		difficulty: '',
		savingThrows: '',
		skills: '',
		immunity: '',
		resistances: '',
		vulnerabilities: '',
		additionalInfo: [],
		imageUrl: '',
		actions: []
	};
};

export const handleMonsterPromptInput = (monster: Monster, promptInput: string): Monster => {
	const parsed = JSON.parse(promptInput);
	monster.name = parsed?.name ?? monster.name;
	monster.description = parsed?.description ?? monster.description;
	monster.type = parsed?.type ?? monster.type;
	monster.alignment = parsed?.alignment ?? monster.alignment;
	monster.size = parsed?.size ?? monster.size;
	monster.passivePerception = parsed?.passivePerception ?? monster.passivePerception;
	monster.sight = parsed?.sight ?? monster.sight;
	monster.armourClass = parsed?.armourClass ?? monster.armourClass;
	monster.abilities = parsed?.abilities ?? monster.abilities;
	monster.initiative = parsed?.initiative ?? monster.initiative;
	monster.speed = parsed?.speed ?? monster.speed;
	monster.hitPoints = parsed?.hitPoints ?? monster.hitPoints;
	monster.hitDice = parsed?.hitDice ?? monster.hitDice;
	monster.notes = parsed?.notes ?? monster.notes;
	monster.languages = parsed?.languages ?? monster.languages;
	monster.difficulty = parsed?.difficulty ?? monster.difficulty;
	monster.savingThrows = parsed?.savingThrows ?? monster.savingThrows;
	monster.additionalInfo = parsed?.additionalInfo ?? monster.additionalInfo;
	monster.imageUrl = parsed?.imageUrl ?? monster.imageUrl;
	monster.actions = parsed?.actions ?? monster.actions;
	return monster;
};

//CRUD

export const saveMonster = (monster: Monster): number => {
	let monsters = loadData('monsters') as Monster[];
	if (monsters === undefined) {
		monsters = [];
	}

	if (monster.id === 0) {
		monster.id = monsters.length + 1;
		monsters.push(monster);
	} else {
		const index = monsters.findIndex((x) => x.id === monster.id);
		monsters[index] = monster;
	}

	saveData('monsters', monsters);

	return monster.id;
};

export const deleteMonster = (id: number): void => {
	let monsters = loadData('monsters') as Monster[];
	if (monsters === undefined) {
		monsters = [];
	}

	const index = monsters.findIndex((x) => x.id === id);
	monsters.splice(index, 1);

	saveData('monsters', monsters);
};

export const getMonster = (id: number): Monster => {
	let monsters = loadData('monsters') as Monster[];
	if (monsters === undefined) {
		monsters = [];
	}

	return monsters.find((x) => x.id === id) ?? newEmptyMonster();
};

export const getMonsters = (): Monster[] => {
	return (loadData('monsters') as Monster[]) ?? [];
};
