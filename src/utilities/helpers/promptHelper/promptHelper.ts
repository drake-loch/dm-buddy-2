import type { Character } from '../charHelper';

export const generateRandomCharPrompt = (char: Character) => {
	const charString = JSON.stringify(char);

	return `Generate a random NPC for Dungeons and Dragons 5th edition and then format to JSON using the following type and object:
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
        \`
        ${charString}
        \`
        Fill out any empty strings with this npc's details. Put any additional info in notes such as character description, backstory, etc.
        Don't forget to add any features or attacks they may have
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
