<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import QuestPage from '../../../components/common/wiki/pages/QuestPage.svelte';
	import SessionPage from '../../../components/common/wiki/pages/SessionPage.svelte';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import { getQuest, newQuest } from '../../../utilities/helpers/campaignHelper';

	export let data;

	const FORM_NAME = 'quest-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let quest = getQuest(+data.id) ?? newQuest();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		console.log(quest);

		// editing = false;

		// const id = saveOrg(org);
		// if (+data.id !== id) {
		// 	goto(`/organizations/${id}`);
		// }
	};
</script>

<PageLayout windowTitle={`Quest - ${isNew ? 'New Quest' : quest.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<QuestPage bind:quest {editing} {submit} name={FORM_NAME} />
</PageLayout>
