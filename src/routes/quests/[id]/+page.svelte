<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import QuestPage from '../../../components/common/wiki/pages/QuestPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import {
		addQuestToCampaign,
		getQuest,
		newQuest,
		saveQuest
	} from '../../../utilities/helpers/campaignHelper';

	export let data;

	const FORM_NAME = 'quest-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let quest = getQuest(+data.id) ?? newQuest();

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		quest.name = values?.name.toString() ?? quest.name;
		quest.description = values?.desc.toString() ?? quest.description;
		quest.notes = values?.notes.toString() ?? quest.notes;
		quest.imageUrl = values?.imageUrl.toString() ?? quest.imageUrl;
		quest.rewards = values?.rewards.toString() ?? quest.rewards;

		const id = saveQuest(quest);
		if (isNew) {
			const cid = data.cid;
			if (cid && !Number.isNaN(data.cid)) {
				addQuestToCampaign(+cid, id);
			}
			goto(`/quests/${id}`);
		}
		editing = false;
	};
</script>

<PageLayout windowTitle={`Quest - ${isNew ? 'New Quest' : quest.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<QuestPage bind:quest {editing} {submit} name={FORM_NAME} />
</PageLayout>
