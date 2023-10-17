<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import SessionPage from '../../../components/common/wiki/pages/SessionPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import {
		addSessionToCampaign,
		getCampaign,
		getSession,
		newSession,
		saveSession
	} from '../../../utilities/helpers/campaignHelper';

	export let data;

	const FORM_NAME = 'session-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let session = getSession(+data.id) ?? newSession();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		editing = false;

		session.name = values?.name.toString() ?? session.name;

		const id = saveSession(session);
		if (isNew) {
			const cid = data.cid;
			if (cid && !Number.isNaN(data.cid)) {
				addSessionToCampaign(+cid, id);
			}
			goto(`/sessions/${id}`);
		}
		editing = false;
	};
</script>

<PageLayout windowTitle={`Session - ${isNew ? 'New Session' : session.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<SessionPage bind:session {editing} {submit} name={FORM_NAME} />
</PageLayout>
