<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		getCampaigns,
		getQuests,
		getSessions,
		newCampaign
	} from '../../../../utilities/helpers/campaignHelper';
	import { getAllBeings } from '../../../../utilities/helpers/dataManager';
	import { getOrgs, newOrg, type Org } from '../../../../utilities/helpers/orgHelper';

	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import Link from '../components/common/Link.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Text from '../components/common/Text.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Multiselect from '../components/formControl/Multiselect.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';

	export let editing = false;
	export let campaign = newCampaign();

	export let submit: (form: any) => void;
	export let name: string = '';

	const beings = getAllBeings();
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if campaign.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={campaign.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={campaign.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={campaign.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Description" />
					<Textarea
						name="description"
						bind:value={campaign.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Quests" />
					<span class="flex flex-col w-full gap-2 pb-2 pt-1">
						<Multiselect
							{editing}
							label="Quests:"
							bind:values={campaign.quests}
							options={getCampaigns().map((q) => {
								return {
									label: q.name,
									value: q.id
								};
							}) ?? []}
						/>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Sessions" />
					<span class="flex flex-col w-full gap-2 pb-2 pt-1">
						<Multiselect
							{editing}
							label="Sessions:"
							bind:values={campaign.sessions}
							options={getSessions().map((s) => {
								return {
									label: s.name,
									value: s.id
								};
							}) ?? []}
						/>
					</span>
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					{#if campaign.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={campaign.imageUrl} />
						</span>
					{/if}
					<span class="flex flex-col items-center">
						<p class="text-2xl font-semibold">{campaign.name}</p>
						<p class="text-md italic">Campaign</p>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={campaign.description === ''}>
					<Title text="Description" />
					<Text text={campaign.description} />
				</SectionWrapper>

				<SectionWrapper hidden={campaign.quests.length === 0}>
					<Title text="Quests" />
					<ul class="list-disc px-4">
						{#each campaign.quests as quest, index}
							<li class="list-item">
								<Link
									href={`/quests/${quest}?cid=${campaign.id}`}
									text={getQuests().find((q) => q.id === quest)?.name ?? 'Unknown'}
								/>
							</li>
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={campaign.sessions.length === 0}>
					<span class="flex justify-center items-center gap-4 w-full">
						<Title text="Sessions" />
						<button
							type="button"
							class="bg-green-500 hover:bg-green-600 px-2 rounded-md boreder flex justify-center"
							on:click={() => {
								goto(`/sessions/new?cid=${campaign.id}`);
							}}>+ New</button
						>
					</span>
					<ul class="list-disc px-4">
						{#each campaign.sessions as session, index}
							<li class="list-item">
								<Link
									href={`/sessions/${session}?cid=${campaign.id}`}
									text={getSessions().find((s) => s.id === session)?.name ?? 'Unknown'}
								/>
							</li>
						{/each}
					</ul>
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2">{campaign.name}</h1>
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							campaign.additionalInfo = [...campaign.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each campaign.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								campaign.additionalInfo = campaign.additionalInfo.filter((_, index) => index !== i);
							}}
							save={() => {
								campaign.additionalInfo = [...campaign.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
