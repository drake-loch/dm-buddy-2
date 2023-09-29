import { loadData, saveData } from '../dataManager';

export type Being = {
	id: number | undefined;
	name: string;
	type: 'character' | 'npc' | 'none' | 'custom';
};
export type OrgMember = Being & {
	role: string;
};

export type Org = {
	id: number;
	type: string;
	name: string;
	description: string;
	imageUrl: string;
	leaders: OrgMember[];
	members: OrgMember[];
	places: { id: number; role: string }[];
	goals: string;
	motto: string;
	quests: number[];
	additionalInfo: { title: string; data: string }[];
	notes: string;
};

export let newOrg = (): Org => {
	return {
		id: 0,
		name: 'Name',
		type: 'Type',
		description: '',
		imageUrl: '',
		leaders: [],
		members: [],
		places: [],
		goals: '',
		motto: '',
		quests: [],
		notes: '',
		additionalInfo: []
	};
};

// ====================================================================================================

export let saveOrg = (org: Org): number => {
	let orgs = loadData('orgs') as Org[];
	if (orgs === undefined) {
		orgs = [];
	}

	if (org.id === 0) {
		org.id = orgs.length + 1;
		orgs.push(org);
	} else {
		let index = orgs.findIndex((x) => x.id === org.id);
		orgs[index] = org;
	}

	saveData('orgs', orgs);

	return org.id;
};

export let getOrg = (id: number): Org | undefined => {
	let orgs = loadData('orgs') as Org[];
	if (orgs === undefined) {
		return undefined;
	}
	return orgs.find((x) => x.id === id);
};

export let getOrgs = (): Org[] => {
	return (loadData('orgs') as Org[]) ?? [];
};

export let deleteOrg = (id: number): void => {
	let orgs = loadData('orgs') as Org[];
	let index = orgs.findIndex((x) => x.id === id);

	if (index >= 0) {
		orgs.splice(index, 1);
		saveData('orgs', orgs);
	}
};
