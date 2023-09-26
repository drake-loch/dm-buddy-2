<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import OrgPage from '../../../components/common/wiki/pages/OrgPage.svelte';
	import SessionPage from '../../../components/common/wiki/pages/SessionPage.svelte';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { getSession, newSession } from '../../../utilities/helpers/campaignHelper';
	import { getOrg, newOrg, saveOrg } from '../../../utilities/helpers/orgHelper';

	export let data;

	const FORM_NAME = 'session-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let session = getSession(+data.id) ?? newSession();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		editing = false;

		// const id = saveOrg(org);
		// if (+data.id !== id) {
		// 	goto(`/organizations/${id}`);
		// }
	};
</script>

<PageLayout windowTitle={`Session - ${isNew ? 'New Place' : session.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<SessionPage bind:session {editing} {submit} name={FORM_NAME} />
</PageLayout>
