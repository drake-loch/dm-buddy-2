export function load({ params }: { params: { id: string } }) {
	const id = +params.id;
	return { id };
}
