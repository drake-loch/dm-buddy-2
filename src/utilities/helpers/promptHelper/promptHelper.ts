import type { Character } from '../charHelper';
import type { NPC } from '../npcHelper/npcHelper';
import type { Settlement } from '../settlementHelper';

export const generateRandomCharPrompt = (char: Character) => {
	const charString = JSON.stringify(char);

	return `Generate a random NPC for Dungeons and Dragons 5th edition and then format to JSON using the following type and object:
    \`
        type Character = {
            fullName: string;
            race: string;
            gender: string;
            class: string;
            age: number;
            alignment: string;
            background: string;
            characteristics: {
                personalityTraits: string;
                ideals: string;
                bonds: string;
                flaws: string;
            };
            stats: {
                str: number;
                dex: number;
                con: number;
                int: number;
                wis: number;
                cha: number;
            };
            savingThrows: {
                str: boolean;
                dex: boolean;
                con: boolean;
                int: boolean;
                wis: boolean;
                cha: boolean;
            };
            skills: {
                acrobatics: Skill;
                animalHandling: Skill;
                arcana: Skill;
                athletics: Skill;
                deception: Skill;
                history: Skill;
                insight: Skill;
                intimidation: Skill;
                investigation: Skill;
                medicine: Skill;
                nature: Skill;
                perception: Skill;
                performance: Skill;
                persuasion: Skill;
                religion: Skill;
                sleightOfHand: Skill;
                stealth: Skill;
                survival: Skill;
            };
            passivePerception: number;
            otherProficiencies: { type: string; bonus: number }[];
            armorClass: number;
            initiative: number;
            speed: number;
            hitPoints: number;
            currentHitPoints: number;
            hitDice: string;
            deathSaves: {
                successes: number;
                failures: number;
            };
            attacks: {
                name: string;
                bonus: number;
                damage: string;
                damageType: string;
            }[];
            equipment: { name: string; amount: number }[];
            features: { title: string; source: string; desc: string }[];
            spellcasting: {
                ability: string;
                saveDC: number;
                spellAttackBonus: number;
                spells: {
                    name: string;
                    level: number;
                    school: string;
                    castingTime: string;
                    range: string;
                    components: string;
                    duration: string;
                    description: string;
                    damage: string;
                    damageType: string;
                }[];
            };
            notes: string;
            additionalInfo: { title: string; data: string }[];
        \`
        \`
        ${charString}
        \`
        Fill out any empty strings with this character's details. Use any fields as context when generating a character. Try not to overwrite any
        field that is filled. Class may also be an occupation if it fits better. Additional Info is used as a wiki entry. Notes may contain other extra info for generating. Add any additional info into notes such as character description, backstory, etc.
        Don't forget to add any features or attacks they may have, but don't overwrite any notes that are already there.
        `;
};

export const generateQuickCharPrompt = (char: Character) => {
	const charString = JSON.stringify(char);

	return `Generate a random Character for Dungeons and Dragons 5th edition and then format to JSON using the following type:
    \`
        type Character = {
            fullName: string;
            race: string;
            gender: string;
            class: string;
            age: number;
            alignment: string;
            background: string;
            characteristics: {
                personalityTraits: string;
                ideals: string;
                bonds: string;
                flaws: string;
            };
            stats: {
                str: number;
                dex: number;
                con: number;
                int: number;
                wis: number;
                cha: number;
            };
            notes: string;
            additionalInfo: { title: string; data: string }[];
        \`
        Use the following character object as a template, but only generate info provided in the type above:
        \`
        ${charString}
        \`
        Fill out any empty strings with the details you generated for this character. Use any fields as context when generating a character. Try not to overwrite any
        field that is filled. Additional Info is used as a wiki entry. Notes may contain other extra info for generating. Add any additional info into notes such as character description, backstory, etc.
        `;
};

export const generateRandomNPCPrompt = (npc: NPC) => {
	const npcString = JSON.stringify(npc);

	return `Generate a random generic NPC for Dungeons and Dragons 5th edition and then format to JSON using the following type and object:
    \`
    type NPC = {
        fullName: string;
        type: string; // large humanoid, small humanoid, etc.
        race: string;
        gender: string;
        size: string;
        occupation: string;
        age: number;
        alignment: string;
        characteristics: {
            personalityTraits: string;
            ideals: string;
            bonds: string;
            flaws: string;
        };
        stats: {
            str: number;
            dex: number;
            con: number;
            int: number;
            wis: number;
            cha: number;
        };
        savingThrows: {
            str: boolean;
            dex: boolean;
            con: boolean;
            int: boolean;
            wis: boolean;
            cha: boolean;
        };
        skills: {
            acrobatics: Skill;
            animalHandling: Skill;
            arcana: Skill;
            athletics: Skill;
            deception: Skill;
            history: Skill;
            insight: Skill;
            intimidation: Skill;
            investigation: Skill;
            medicine: Skill;
            nature: Skill;
            perception: Skill;
            performance: Skill;
            persuasion: Skill;
            religion: Skill;
            sleightOfHand: Skill;
            stealth: Skill;
            survival: Skill;
        };
        passivePerception: number;
        otherProficiencies: { type: string; bonus: number }[];
        armorClass: number;
        initiative: number;
        speed: number;
        hitPoints: number;
        currentHitPoints: number;
        hitDice: string;
        equipment: { name: string; amount: number }[];
        features: { title: string; source: string; desc: string }[];
        actions: { title: string; desc: string }[];
        notes: string;
        rpNotes: string;
        additionalInfo: { title: string; data: string }[];
        quests: { title: string; data: string; rewards: string[] }[];
    }
        \`
        \`
        ${npcString}
        \`
        Fill out any empty strings with this npc's details. Use any fields as context when generating a character. Try not to overwrite any
        field that is filled. Additional Info is used as a wiki entry. Add any additional info such as character description, backstory, etc.
        Notes may contain other extra info for generating. Don't overwrite any notes that are already there.
        `;
};

export const generateQuickNPCPrompt = (npc: NPC) => {
	const npcString = JSON.stringify(npc);

	return `Generate a random generic NPC for Dungeons and Dragons 5th edition and then format to JSON using the following type:
    \`
    type NPC = {
        fullName: string;
        race: string;
        gender: string;
        size: string;
        occupation: string;
        age: number;
        alignment: string;
        characteristics: {
            personalityTraits: string;
            ideals: string;
            bonds: string;
            flaws: string;
        };
        stats: {
            str: number;
            dex: number;
            con: number;
            int: number;
            wis: number;
            cha: number;
        };
        features: { title: string; source: string; desc: string }[];
        actions: { title: string; desc: string }[];
        notes: string;
        rpNotes: string;
        additionalInfo: { title: string; data: string }[];
        quests: { title: string; data: string; rewards: string[] }[];
    }
        \`
        Use the following npc object as a template, but only generate info provided in the type above:
        \`
        ${npcString}
        \`
        Fill out any empty strings with this npc's details. Use any fields as context when generating this npc. Try not to overwrite any
        field that are filled. Additional Info is used as a wiki entry. Add any additional info such as character description, backstory, etc.
        Notes may contain other extra info for generating. Don't overwrite any notes that are already there.
        `;
};

export const generateRandomSettlementPrompt = (settlement: Settlement) => {
	const settlementString = JSON.stringify(settlement);

	return `Randomly Generate a settlement for Dungeons and Dragons 5th edition and then format to JSON using the following type and object:
    \`
    type Settlement = {
        id: number;
        name: string;
        population: number;
        size: string;
        type: string;
        alignment: string;
        description: string;
        government: string;
        authorityFigures: { id: number; role: string }[];
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
        \`
        \`
        ${settlementString}
        \`
        Use any fields as context when generating. Fill out any missing details if possible. Try not to overwrite any field that is filled. Additional Info is used as a wiki entry. Notes may contain other extra info for generating. Don't overwrite any notes that are already there. Don't fill out any ids
        `;
};

export const generateRandomCharInitPrompt = (char: Character) => {
	const charString = JSON.stringify(char);

	return `Generate a random NPC for Dungeons and Dragons 5th edition and then format to JSON using the following object:
        \`
        type Character = {
            name: string;
            race: string;
            gender: string;
            class: string;
            age: number;
            alignment: string;
            background: string;
            characteristics: {
                personalityTraits: string;
                ideals: string;
                bonds: string;
                flaws: string;
            };
            stats: {
                str: number;
                dex: number;
                con: number;
                int: number;
                wis: number;
                cha: number;
            };
            savingThrows: {
                str: boolean;
                dex: boolean;
                con: boolean;
                int: boolean;
                wis: boolean;
                cha: boolean;
            };
            skills: {
                acrobatics: Skill;
                animalHandling: Skill;
                arcana: Skill;
                athletics: Skill;
                deception: Skill;
                history: Skill;
                insight: Skill;
                intimidation: Skill;
                investigation: Skill;
                medicine: Skill;
                nature: Skill;
                perception: Skill;
                performance: Skill;
                persuasion: Skill;
                religion: Skill;
                sleightOfHand: Skill;
                stealth: Skill;
                survival: Skill;
            };
            passivePerception: number;
            otherProficiencies: { type: string; bonus: number }[];
            armorClass: number;
            initiative: number;
            speed: number;
            hitPoints: number;
            currentHitPoints: number;
            hitDice: string;
            deathSaves: {
                successes: number;
                failures: number;
            };
            attacks: {
                name: string;
                bonus: number;
                damage: string;
                damageType: string;
            }[];
            equipment: { name: string; amount: number }[];
            features: { title: string; source: string; desc: string }[];
            spellcasting: {
                ability: string;
                saveDC: number;
                spellAttackBonus: number;
                spells: {
                    name: string;
                    level: number;
                    school: string;
                    castingTime: string;
                    range: string;
                    components: string;
                    duration: string;
                    description: string;
                    damage: string;
                    damageType: string;
                }[];
            };
            notes: string;
        \`
        Fill out any empty strings with this npc's details. Put any additional info in notes such as character description, backstory, etc.
        `;
};
