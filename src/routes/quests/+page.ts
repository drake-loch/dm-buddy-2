export function load({ url }) {
	const search = url.search;

	if (search && search.includes('cid=')) {
		const cid = search.split('cid=')[1];
		return { cid };
	}
}
