<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import OrgPage from '../../../components/common/wiki/pages/OrgPage.svelte';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
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

		console.log('Org', org);
	};
</script>

<svelte:head>
	<title>Organization - {isNew ? 'New Organization' : org.name}</title>
</svelte:head>

<PageLayout>
	<div
		slot="sidebar"
		class="md:space-y-2 py-2 px-2 md:p-0 flex flex-row-reverse md:block justify-between items-center"
	>
		<NavMenu />
		<ToolbarIi formName={FORM_NAME} bind:editing />
	</div>
	<OrgPage bind:org {editing} {submit} name={FORM_NAME} />
</PageLayout>
