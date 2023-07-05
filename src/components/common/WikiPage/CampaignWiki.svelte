<script lang="ts">
	import {
		newCampaign,
		type Campaign,
		deleteQuest,
		deleteSession,
		getQuests
	} from '../../../utilities/helpers/campaignHelper';
	import Table from '../Table/Table.svelte';
	import WikiPage from './WikiPage.svelte';
	import WikiEntry from './components/WikiEntry.svelte';

	export let editMode = false;
	export let campaign: Campaign = newCampaign();
	export let campaignId: number | undefined = undefined;
	$: console.log(editMode);

	$: questList = getQuests(campaignId ?? undefined).map((q) => {
		return {
			name: { value: q.name, link: `/campaigns/${campaignId}/quests/${q.id}` },
			order: { value: `${q.id}` }
		};
	});

	$: sessionList = campaign.sessions.map((s) => {
		return {
			name: { value: s.name, link: `/campaigns/${campaignId}/sessions/${s.id}` },
			order: { value: `${s.id}` }
		};
	});
</script>

<WikiPage
	{editMode}
	bind:title={campaign.name}
	type="Campaign"
	staticType
	additionalInfo={campaign.additionalInfo}
>
	<div class="" slot="wiki-top">
		<div class="flex w-full mb-24 justify-evenly">
			<div class="w-1/3">
				<h3 class="text-2xl mb-2">Quests</h3>
				<Table headers={['Order', 'Name']} rows={questList} _class="w-full">
					<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
						<button
							type="button"
							on:click={() => {
								questList = deleteQuest(+row.id.value)
									.map((q) => {
										return {
											name: { value: q.name, link: `campaigns/${campaignId}/quests/${q.id}` },
											order: { value: `${q.order}` }
										};
									})
									.sort((a, b) => +a.order.value - +b.order.value);
								questList = questList;
							}}
							class="bg-red-600 px-2 rounded-md hover:bg-red-400"
						>
							🗑️
						</button>
					</div>
				</Table>
			</div>
			<div class="w-1/3">
				<h3 class="text-2xl mb-2">Sessions</h3>
				<Table headers={['Order', 'Name']} rows={sessionList} _class="w-full">
					<div class="flex px-1 py-4 gap-1 justify-center items-center" slot="action" let:row>
						<button
							type="button"
							on:click={() => {
								sessionList = deleteSession(+row.id.value).map((s) => {
									return {
										name: { value: s.name, link: `/sessions/${s.id}` },
										order: { value: `${s.id}` }
									};
								});
								sessionList = sessionList;
							}}
							class="bg-red-600 px-2 rounded-md hover:bg-red-400"
						>
							🗑️
						</button>
					</div>
				</Table>
			</div>
		</div>
	</div>
	<div slot="wiki" class="mb-2 w-full">
		<WikiEntry
			{editMode}
			titleEditable={false}
			deleteModule={() => {
				console.log('delete');
			}}
			title="Notes"
			bind:data={campaign.notes}
			placeholder="Notes"
		/>
	</div>
</WikiPage>
