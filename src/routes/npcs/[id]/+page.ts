export function load({ params }) {
	const id = +params.id;
	console.log('NPC ID: ', id);
	return { id };
}
