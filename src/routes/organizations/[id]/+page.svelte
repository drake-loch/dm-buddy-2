<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import OrgPage from '../../../components/common/wiki/pages/OrgPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { getOrg, newOrg, saveOrg } from '../../../utilities/helpers/orgHelper';

	export let data;

	const FORM_NAME = 'org-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let org = getOrg(+data.id) ?? newOrg();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		org.goals = values?.goals.toString() ?? org.goals;
		org.motto = values?.motto.toString() ?? org.motto;
		org.name = values?.name.toString() ?? org.name;
		org.imageUrl = values?.imageUrl.toString() ?? org.imageUrl;
		org.type = values?.type.toString() ?? org.type;
		org.description = values?.description.toString() ?? org.description;
		org.notes = values?.notes.toString() ?? org.notes;

		editing = false;

		const id = saveOrg(org);
		if (+data.id !== id) {
			goto(`/organizations/${id}`);
		}
	};
</script>

<PageLayout windowTitle={`Organization - ${isNew ? 'New Organization' : org.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<OrgPage bind:org {editing} {submit} name={FORM_NAME} />
</PageLayout>
