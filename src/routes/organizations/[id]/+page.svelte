<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import OrgPage from '../../../components/common/wiki/pages/OrgPage.svelte';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { getOrg, newOrg } from '../../../utilities/helpers/orgHelper';

	export let data;

	const FORM_NAME = 'org-form';

	let editing = Number.isNaN(data.id) ?? false;
	let org = getOrg(+data.id) ?? newOrg();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		// editing = false;
		org.goals = values?.goals.toString() ?? org.goals;
		org.motto = values?.motto.toString() ?? org.motto;
		org.name = values?.name.toString() ?? org.name;
		org.imageUrl = values?.imageUrl.toString() ?? org.imageUrl;
		org.type = values?.type.toString() ?? org.type;

		console.log('Org', org);
	};
</script>

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
