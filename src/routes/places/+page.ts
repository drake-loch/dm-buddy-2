export function load({ url }) {
	const search = url.search;

	if (search && search.includes('ppid=')) {
		const ppid = search.split('ppid=')[1];
		return { ppid };
	}
}
