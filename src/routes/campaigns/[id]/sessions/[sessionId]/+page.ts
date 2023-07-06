export function load({ params }: { params: { id: string; sessionId: string } }) {
	const sessionId = +params.sessionId;
	const campaignId = +params.id;
	return { sessionId, campaignId };
}
