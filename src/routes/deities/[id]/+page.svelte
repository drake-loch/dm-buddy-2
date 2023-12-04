<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import DeityPage from '../../../components/common/wiki/pages/DeityPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { getDeity, newDeity, saveDeity } from '../../../utilities/helpers/deityHelper';

	export let data;

	const FORM_NAME = 'deity-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let deity = getDeity(data.id) ?? newDeity();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		deity.name = values?.name.toString() ?? deity.name;
		deity.imageUrl = values?.imageUrl.toString() ?? deity.imageUrl;
		deity.type = values?.type.toString() ?? deity.type;
		deity.description = values?.description.toString() ?? deity.description;
		deity.notes = values?.notes.toString() ?? deity.notes;

		editing = false;

		const id = saveDeity(deity);
		if (+data.id !== id) {
			goto(`/deities/${id}`);
		}
	};
</script>

<PageLayout windowTitle={`Deity - ${isNew ? 'New Deity' : deity.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<DeityPage bind:deity {editing} {submit} name={FORM_NAME} />
</PageLayout>
