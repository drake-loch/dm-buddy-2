export type Skill = {
	proficient: boolean;
};
export type Character = {
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
};

export const newEmptyCharacter = (): Character => {
	return {
		name: '',
		race: '',
		gender: '',
		class: '',
		age: 0,
		alignment: '',
		background: '',
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
		deathSaves: {
			successes: 0,
			failures: 0
		},
		attacks: [],
		equipment: [],
		features: [],
		spellcasting: {
			ability: '',
			saveDC: 0,
			spellAttackBonus: 0,
			spells: []
		},
		notes: ''
	};
};

export const handleCharacterPromptInput = (char: Character, promptInput: string): Character => {
	// console.log(promptInput);
	//input is a json string
	//parse the json string
	//get name
	const parsed = JSON.parse(promptInput);
	console.log('PARSED: ', parsed);
	//fill as many fields as possible to character
	// any leftover key-value pairs are converted to a string and added to notes
	// if a key-value pair is not a string, it is converted to a string and added to notes
	char.name = parsed?.name ?? char.name;
	char.class = parsed?.class ?? char.class;
	if (parsed?.level) {
		char.class = `${char.class} ${parsed.level}`;
	}
	char.background = parsed?.background ?? char.background;
	char.age = parsed?.age ?? char.age;
	char.alignment = parsed?.alignment ?? char.alignment;
	char.race = parsed?.race ?? char.race;
	char.gender = parsed?.gender ?? char.gender;

	char.characteristics.personalityTraits =
		parsed?.personalityTraits ??
		parsed?.characteristics.personalityTraits ??
		char.characteristics.personalityTraits;
	char.characteristics.ideals =
		parsed?.ideals ?? parsed?.characteristics.ideals ?? char.characteristics.ideals;
	char.characteristics.bonds =
		parsed?.bonds ?? parsed?.characteristics.bonds ?? char.characteristics.bonds;
	char.characteristics.flaws =
		parsed?.flaws ?? parsed?.characteristics.flaws ?? char.characteristics.flaws;

	char.stats.str = parsed?.str ?? parsed?.strength ?? parsed?.stats.str ?? char.stats.str;
	char.stats.dex = parsed?.dex ?? parsed?.dexterity ?? parsed?.stats.dex ?? char.stats.dex;
	char.stats.con = parsed?.con ?? parsed?.constitution ?? parsed?.stats.con ?? char.stats.con;
	char.stats.int = parsed?.int ?? parsed?.intelligence ?? parsed?.stats.int ?? char.stats.int;
	char.stats.wis = parsed?.wis ?? parsed?.wisdom ?? parsed?.stats.wis ?? char.stats.wis;
	char.stats.cha = parsed?.cha ?? parsed?.charisma ?? parsed?.stats.cha ?? char.stats.cha;
	char.notes = parsed?.notes ?? char.notes;
	char.attacks = parsed?.attacks ?? char.attacks;
	char.features = parsed?.features ?? char.features;
	char.spellcasting = parsed?.spellcasting ?? char.spellcasting;
	char.savingThrows = parsed?.savingThrows ?? char.savingThrows;
	char.skills = parsed?.skills ?? char.skills;

	char.equipment =
		parsed?.equipment.map((item: any) => {
			return {
				name: item.name ?? item,
				amount: item?.amount ?? 1
			};
		}) ?? char.equipment;

	// console.log('GEN: ', char);
	return char;
};

export const getBonus = (stat: number, proficient: boolean, bonus = 2): number => {
	return Math.floor((stat - 10) / 2) + (proficient ? bonus : 0);
};

//create a function that gets the skill bonus for a given skill by using it's name
//so if we wanted to get acrobatics, we just pass in 'acrobatics' and it returns the bonus
