<script lang="ts">
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../../components/toolbar/Toolbar.svelte';
	import { goto } from '$app/navigation';
	import CampaignWiki from '../../../components/common/WikiPage/CampaignWiki.svelte';
	import {
		deleteCampaign,
		getCampaign,
		newCampaign,
		removeAllQuestsFromCampaign,
		removeAllSessionsFromCampaign,
		saveCampaign
	} from '../../../utilities/helpers/campaignHelper';
	import DeleteBanner from '../../../components/common/deleteBanner/DeleteBanner.svelte';
	import CharWikiPage from '../../../components/common/WikiPage/CharWikiPage.svelte';
	import { getCharacter, saveCharacter } from '../../../utilities/helpers/dataManager';
	import CharCreate from '../../../pages/CharCreate/index.svelte';
	import NavMenu from '../../../components/nav/NavMenu.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import CampaignPage from '../../../components/common/wiki/pages/CampaignPage.svelte';

	export let data;

	const FORM_NAME = 'campaign-form';

	let campaign = getCampaign(+data.id) ?? newCampaign();

	let editing = Number.isNaN(data.id) ?? false;
	let isNew = Number.isNaN(data.id) ?? false;

	let wikiView = true;

	let deleteWarning = false;

	let toggleMod = false;

	let charId: number | undefined = undefined;

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

<PageLayout>
	<div
		slot="sidebar"
		class="md:space-y-2 py-2 px-2 md:p-0 flex flex-row-reverse md:block justify-between items-center"
	>
		<NavMenu />
		<ToolbarIi formName={FORM_NAME} bind:editing />
	</div>
	{#if campaign !== undefined}
		<CampaignPage {editing} {campaign} {submit} name={FORM_NAME} />
		{#if wikiView}
			<!--  -->
			<!-- <CampaignWiki campaignId={data.id} {editing} {campaign} toggleMod={viewChar} /> -->
		{/if}
	{/if}
</PageLayout>
