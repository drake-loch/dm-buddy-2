import { loadData, saveData } from '../dataManager';

export type Deity = {
	id: number;
	type: string;
	alignment: string;
	name: string;
	description: string;
	imageUrl: string;
	affiliatedOrgs: { id: number; data: string }[];
	additionalInfo: { title: string; data: string }[];
	notes: string;
};

export let newDeity = (): Deity => {
	return {
		id: 0,
		name: 'Name',
		type: 'Type',
		alignment: '',
		description: '',
		imageUrl: '',
		affiliatedOrgs: [],
		notes: '',
		additionalInfo: []
	};
};

//CRUD

export let saveDeity = (deity: Deity): number => {
	let deities = loadData('deities') as Deity[];
	if (deities === undefined) {
		deities = [];
	}

	if (deity.id === 0) {
		deity.id = deities.length + 1;
		deities.push(deity);
	} else {
		let index = deities.findIndex((x) => x.id === deity.id);
		deities[index] = deity;
	}

	saveData('deities', deities);

	return deity.id;
};

export let deleteDeity = (id: number): void => {
	let deities = loadData('deities') as Deity[];
	if (deities === undefined) {
		deities = [];
	}

	let index = deities.findIndex((x) => x.id === id);
	deities.splice(index, 1);

	saveData('deities', deities);
};

export let getDeity = (id: number): Deity | undefined => {
	let deities = loadData('deities') as Deity[];
	if (deities === undefined) {
		return undefined;
	}
	return deities.find((x) => x.id === id);
};

export let getDeities = (): Deity[] => {
	return (loadData('deities') as Deity[]) ?? [];
};
