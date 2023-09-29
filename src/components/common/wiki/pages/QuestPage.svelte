<script lang="ts">
	import {
		getCampaigns,
		getQuests,
		newSession,
		saveSession,
		type Quest,
		type Session,
		newQuest,
		saveQuest
	} from '../../../../utilities/helpers/campaignHelper';
	import { getAllBeings } from '../../../../utilities/helpers/dataManager';
	import { getOrgs, newOrg, type Org } from '../../../../utilities/helpers/orgHelper';
	import {
		getPlaces,
		newPlace,
		savePlace,
		type Place
	} from '../../../../utilities/helpers/placeHelper';

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
	export let quest: Quest = newQuest();

	export let submit: (form: any) => void;
	export let name: string = '';

	const beings = getAllBeings();
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if quest.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={quest.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={quest.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={quest.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Description" />
					<Textarea name="desc" value={quest.description} inputClass="w-full" />
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Rewards" />
					<Textarea name="rewards" value={quest.rewards} inputClass="w-full" />
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={quest.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					<span class="flex flex-col items-center">
						{#if quest.imageUrl}
							<Image bind:value={quest.imageUrl} />
						{/if}
						<p class="text-2xl font-semibold">{quest.name}</p>
					</span>
				</SectionWrapper>
				<SectionWrapper hidden={quest.description === ''}>
					<Title text="Description" />
					<Text text={quest.description} />
				</SectionWrapper>

				<SectionWrapper hidden={quest.rewards === ''}>
					<Title text="Rewards" />
					<Text text={quest.rewards} />
				</SectionWrapper>

				<SectionWrapper hidden={quest.notes === ''}>
					<Title text="Notes" />
					<Text text={quest.notes} />
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-4">{quest.name}</h1>
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							quest.steps = [...quest.steps, { title: '', description: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each quest.steps as { title, description }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data={description}
							deleteModule={() => {
								quest.steps = quest.steps.filter((_, index) => index !== i);
							}}
							save={() => {
								quest.steps = [...quest.steps];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
