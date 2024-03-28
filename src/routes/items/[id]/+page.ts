export function load({ params, url }) {
	const id = +params.id;
	const search = url.search;

	return { id };
}
