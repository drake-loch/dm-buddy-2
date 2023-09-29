import { newAbilities, type CharacterBase, formatOldNPC } from '../charHelper';
import { getNPCs, saveData } from '../dataManager';

export type Skill = {
	proficient: boolean;
};

export type Dice = {
	amount: number;
	sides: number;
};
export type NPC = CharacterBase & {
	type: string;
	challengeRating: string;
	occupation: string;
	actions: { title: string; desc: string; dice: Dice }[];
	rpNotes: string;
	quests: { title: string; data: string; rewards: string[] }[];
};

export const newEmptyNPC = (): NPC => {
	return {
		id: 0,
		fullName: '',
		description: '',
		type: '',
		race: '',
		gender: '',
		size: '',
		occupation: '',
		age: 0,
		alignment: '',
		characteristics: {
			personalityTraits: '',
			ideals: '',
			bonds: '',
			flaws: ''
		},
		abilities: newAbilities(),
		proficiencyBonus: 0,
		passivePerception: 0,
		otherProficiencies: [],
		armorClass: 0,
		initiative: 0,
		speed: 0,
		hitPoints: 0,
		currentHitPoints: 0,
		hitDice: '',
		equipment: [],
		actions: [],
		features: [],
		notes: '',
		rpNotes: '',
		additionalInfo: [],
		quests: [],
		imageUrl: '',
		challengeRating: ''
	};
};

export const handleNPCPromptInput = (npc: NPC, promptInput: string): NPC => {
	const parsed = JSON.parse(promptInput);
	npc.fullName = parsed?.fullName ?? parsed?.name ?? npc.fullName;
	npc.occupation = parsed?.occupation ?? npc.occupation;

	npc.age = parsed?.age ?? npc.age;
	npc.alignment = parsed?.alignment ?? npc.alignment;
	npc.race = parsed?.race ?? npc.race;
	npc.gender = parsed?.gender ?? npc.gender;

	npc.characteristics.personalityTraits =
		parsed?.personalityTraits ??
		parsed?.characteristics?.personalityTraits ??
		npc.characteristics.personalityTraits;
	npc.characteristics.ideals =
		parsed?.ideals ?? parsed?.characteristics?.ideals ?? npc.characteristics.ideals;
	npc.characteristics.bonds =
		parsed?.bonds ?? parsed?.characteristics?.bonds ?? npc.characteristics.bonds;
	npc.characteristics.flaws =
		parsed?.flaws ?? parsed?.characteristics?.flaws ?? npc.characteristics.flaws;

	npc.abilities = parsed?.abilities ?? npc.abilities;

	npc.notes = parsed?.notes ?? npc.notes;
	npc.actions = parsed?.actions ?? npc.actions;
	npc.quests = parsed?.quests ?? npc.quests;
	npc.rpNotes = parsed?.rpNotes ?? npc.rpNotes;
	npc.features = parsed?.features ?? npc.features;
	npc.additionalInfo = parsed?.additionalInfo ?? npc.additionalInfo;
	npc.type = parsed?.type ?? npc.type;
	npc.size = parsed?.size ?? npc.size;

	if (parsed?.equipment) {
		npc.equipment =
			parsed?.equipment.map((item: any) => {
				return {
					name: item.name ?? item,
					amount: item?.amount ?? 1
				};
			}) ?? npc.equipment;
	}
	return npc;
};

export const getBonus = (stat: number, proficient: boolean, bonus = 2): number => {
	return Math.floor((stat - 10) / 2) + (proficient ? bonus : 0);
};
