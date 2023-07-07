import type { CharacterBase } from '../charHelper';
import { getNPCs } from '../dataManager';

export type Skill = {
	proficient: boolean;
};
export type NPC = CharacterBase & {
	type: string;
	occupation: string;
	actions: { title: string; desc: string }[];
	rpNotes: string;
	quests: { title: string; data: string; rewards: string[] }[];
};

export const newEmptyNPC = (): NPC => {
	return {
		id: 0,
		fullName: '',
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
		stats: {
			str: 10,
			dex: 10,
			con: 10,
			int: 10,
			wis: 10,
			cha: 10
		},
		savingThrows: {
			str: false,
			dex: false,
			con: false,
			int: false,
			wis: false,
			cha: false
		},
		skills: {
			acrobatics: {
				proficient: false
			},
			animalHandling: {
				proficient: false
			},
			arcana: {
				proficient: false
			},
			athletics: {
				proficient: false
			},
			deception: {
				proficient: false
			},
			history: {
				proficient: false
			},
			insight: {
				proficient: false
			},
			intimidation: {
				proficient: false
			},
			investigation: {
				proficient: false
			},
			medicine: {
				proficient: false
			},
			nature: {
				proficient: false
			},
			perception: {
				proficient: false
			},
			performance: {
				proficient: false
			},
			persuasion: {
				proficient: false
			},
			religion: {
				proficient: false
			},
			sleightOfHand: {
				proficient: false
			},
			stealth: {
				proficient: false
			},
			survival: {
				proficient: false
			}
		},
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
		quests: []
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
		parsed?.characteristics.personalityTraits ??
		npc.characteristics.personalityTraits;
	npc.characteristics.ideals =
		parsed?.ideals ?? parsed?.characteristics.ideals ?? npc.characteristics.ideals;
	npc.characteristics.bonds =
		parsed?.bonds ?? parsed?.characteristics.bonds ?? npc.characteristics.bonds;
	npc.characteristics.flaws =
		parsed?.flaws ?? parsed?.characteristics.flaws ?? npc.characteristics.flaws;

	npc.stats.str = parsed?.str ?? parsed?.strength ?? parsed?.stats.str ?? npc.stats.str;
	npc.stats.dex = parsed?.dex ?? parsed?.dexterity ?? parsed?.stats.dex ?? npc.stats.dex;
	npc.stats.con = parsed?.con ?? parsed?.constitution ?? parsed?.stats.con ?? npc.stats.con;
	npc.stats.int = parsed?.int ?? parsed?.intelligence ?? parsed?.stats.int ?? npc.stats.int;
	npc.stats.wis = parsed?.wis ?? parsed?.wisdom ?? parsed?.stats.wis ?? npc.stats.wis;
	npc.stats.cha = parsed?.cha ?? parsed?.charisma ?? parsed?.stats.cha ?? npc.stats.cha;
	npc.notes = parsed?.notes ?? npc.notes;
	npc.actions = parsed?.actions ?? npc.actions;
	npc.savingThrows = parsed?.savingThrows ?? npc.savingThrows;
	npc.skills = parsed?.skills ?? npc.skills;

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
