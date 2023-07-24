export function load({ params }: { params: { id: string; questId: string } }) {
	const questId = +params.questId;
	const campaignId = +params.id;
	return { questId, campaignId };
}
