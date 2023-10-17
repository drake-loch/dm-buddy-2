export function load({ params, url: { search } }) {
	const id = +params.id;
	let cid: string | undefined;

	if (search && search.includes('cid=')) {
		cid = search.split('cid=')[1];
	}

	return { id, cid };
}
