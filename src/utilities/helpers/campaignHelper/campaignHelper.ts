import { loadData, saveData } from '../dataManager';

export type Campaign = {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	characters: number[];
	npcs: number[];
	settlements: number[];
	quests: number[];
	sessions: number[];
	additionalInfo: { title: string; data: string }[];
	notes: string;
};

export type Quest = {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	steps: { title: string; description: string }[];
	notes: string;
	rewards: string;
	order: number;
};

export type Session = {
	id: number;
	name: string;
	createdDate: string;
	updatedDate: string;
	quests: number[];
	additionalInfo: { title: string; data: string }[];
	characters: number[];
	npcs: number[];
	notes: string;
	campaignId?: number;
};

export let newCampaign = (): Campaign => {
	return {
		id: 0,
		name: '',
		description: '',
		imageUrl: '',
		characters: [],
		npcs: [],
		settlements: [],
		quests: [],
		sessions: [],
		notes: '',
		additionalInfo: []
	};
};

export let newQuest = (): Quest => {
	return {
		id: 0,
		name: '',
		description: '',
		imageUrl: '',
		steps: [],
		notes: '',
		rewards: '',
		order: 0
	};
};

export let newSession = (): Session => {
	return {
		id: 0,
		name: `New Session ${new Date().toLocaleDateString()}`,
		createdDate: new Date().toLocaleDateString(),
		updatedDate: new Date().toLocaleDateString(),
		quests: [],
		additionalInfo: [],
		npcs: [],
		characters: [],
		notes: ''
	};
};

// ====================================================================================================

export let saveCampaign = (campaign: Campaign): number => {
	let campaigns = loadData('campaigns') as Campaign[];

	if (campaigns === undefined) {
		campaigns = [];
	}

	if (campaign.id === 0) {
		campaign.id = campaigns.length > 0 ? campaigns[campaigns.length - 1].id + 1 : 1;
		campaigns.push(campaign);
	} else {
		const index = campaigns.findIndex((c) => c.id === campaign.id);
		campaigns[index] = campaign;
	}

	saveData('campaigns', campaigns);

	return campaign.id;
};

export let getCampaign = (id: number): Campaign | undefined => {
	const campaigns = loadData('campaigns') as Campaign[];

	if (campaigns === undefined) {
		return undefined;
	}

	return campaigns.find((c) => c.id === id);
};

export let getCampaigns = (): Campaign[] => {
	const campaigns = loadData('campaigns') as Campaign[];

	if (campaigns === undefined) {
		return [];
	}

	return campaigns;
};

export let deleteCampaign = (id: number): Campaign[] => {
	let campaigns = loadData('campaigns') as Campaign[];

	campaigns = campaigns.filter((c) => c.id !== id);

	for (let i = 0; i < campaigns.length; i++) {
		campaigns[i].id = i + 1;
	}

	saveData('campaigns', campaigns);

	return campaigns;
};

// ====================================================================================================

export let saveQuest = (quest: Quest): number => {
	let quests = loadData('quests') as Quest[];

	if (quests === undefined) {
		quests = [];
	}

	if (quest.id === 0) {
		quest.id = quests.length + 1;
		quests.push(quest);
	} else {
		const index = quests.findIndex((q) => q.id === quest.id);
		quests[index] = quest;
	}

	saveData('quests', quests);
	return quest.id;
};

export let getQuest = (questId: number, campaignId?: number): Quest | undefined => {
	let campaign = getCampaign(campaignId ?? -99) as Campaign;

	if (campaign === undefined && campaignId !== undefined) {
		return undefined;
	}

	let quests = loadData('quests') as Quest[];

	if (quests === undefined) {
		return undefined;
	}

	if (campaignId === undefined) {
		return quests.find((q) => q.id === questId);
	} else {
		return quests.find((q) => q.id === questId && campaign.quests.includes(q.id));
	}
};

export let getQuests = (campaignId?: number): Quest[] => {
	let campaign = getCampaign(campaignId ?? -99) as Campaign;

	if (campaign === undefined) {
		return [];
	}

	const quests = loadData('quests') as Quest[];

	if (quests === undefined) {
		return [];
	}

	if (campaignId === undefined) {
		return quests;
	} else {
		return quests.filter((q) => campaign.quests.includes(q.id));
	}
};

export let deleteQuest = (id: number, campaignId?: number): Quest[] => {
	let quests = loadData('quests') as Quest[];
	quests = quests.filter((q) => q.id !== id);

	for (let i = 0; i < quests.length; i++) {
		quests[i].id = i + 1;
	}

	saveData('quests', quests);

	if (campaignId !== undefined) {
		removeQuestFromCampaign(campaignId, id);
	}

	return quests;
};

export let addQuestToCampaign = (campaignId: number, questId: number): Campaign => {
	let campaign = getCampaign(campaignId) as Campaign;
	campaign.quests.push(questId);
	saveCampaign(campaign);
	return campaign;
};
export let removeQuestFromCampaign = (campaignId: number, questId: number): Campaign => {
	let campaign = getCampaign(campaignId) as Campaign;
	campaign.quests = campaign.quests.filter((q) => q !== questId);
	saveCampaign(campaign);
	return campaign;
};

// ====================================================================================================

export let saveSession = (session: Session): number => {
	let sessions = loadData('sessions') as Session[];

	if (sessions === undefined) {
		sessions = [];
	}
	session.updatedDate = new Date().toLocaleDateString();

	if (session.id === 0) {
		session.id = sessions.length + 1;
		sessions.push(session);
	} else {
		const index = sessions.findIndex((s) => s.id === session.id);
		sessions[index] = session;
	}

	saveData('sessions', sessions);
	return session.id;
};

export let getSession = (id: number): Session | undefined => {
	let sessions = loadData('sessions') as Session[];
	if (sessions === undefined) {
		return undefined;
	}

	return sessions.find((s) => s.id === id);
};
export let getSessions = (): Session[] => {
	let sessions = loadData('sessions') as Session[];
	if (sessions === undefined) {
		return [];
	}
	return sessions;
};

export let deleteSession = (id: number, campaignId?: number): Session[] => {
	let sessions = loadData('sessions') as Session[];
	sessions = sessions.filter((s) => s.id !== id);

	for (let i = 0; i < sessions.length; i++) {
		sessions[i].id = i + 1;
	}

	saveData('sessions', sessions);

	if (campaignId !== undefined) {
		removeSessionFromCampaign(campaignId, id);
	}

	return sessions;
};

export let addSessionToCampaign = (campaignId: number, sessionId: number): Campaign => {
	let campaign = getCampaign(campaignId) as Campaign;
	campaign.sessions.push(sessionId);
	saveCampaign(campaign);
	return campaign;
};

export let removeSessionFromCampaign = (campaignId: number, sessionId: number): Campaign => {
	let campaign = getCampaign(campaignId) as Campaign;
	campaign.sessions = campaign.sessions.filter((s) => s !== sessionId);
	saveCampaign(campaign);
	return campaign;
};
