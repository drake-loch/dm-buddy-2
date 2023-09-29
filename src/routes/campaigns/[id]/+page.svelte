<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { goto } from '$app/navigation';
	import CampaignWiki from '../../../components/common/WikiPage/CampaignWiki.svelte';
	import {
		deleteCampaign,
		getCampaign,
		newCampaign,
		saveCampaign
	} from '../../../utilities/helpers/campaignHelper';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import CampaignPage from '../../../components/common/wiki/pages/CampaignPage.svelte';

	export let data;

	const FORM_NAME = 'campaign-form';

	let campaign = getCampaign(+data.id) ?? newCampaign();

	let editing = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));

		campaign.name = values.name.toString();
		campaign.description = values.description.toString();
		campaign.imageUrl = values.imageUrl.toString();
		campaign.notes = values.notes.toString();
		campaign.additionalInfo = campaign.additionalInfo.filter(
			(a) => a.title !== '' || a.data !== ''
		);

		const id = saveCampaign(campaign);
		if (isNew) {
			goto(`/campaigns/${id}`);
		}
		editing = false;
	};
</script>

<PageLayout windowTitle={`Campaign - ${isNew ? 'NEW' : campaign.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	{#if campaign !== undefined}
		<CampaignPage {editing} {campaign} {submit} name={FORM_NAME} />
	{/if}
</PageLayout>
