export function load({ params }) {
	const id = +params.id;
	console.log('Character ID: ', id);
	return { id };
}
