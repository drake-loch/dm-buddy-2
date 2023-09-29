export function load({ params, url }) {
	const id = +params.id;
	const search = url.search;

	let ppid: string | undefined;

	if (search && search.includes('ppid=')) {
		ppid = search.split('ppid=')[1];
	}
	return { id, ppid };
}
