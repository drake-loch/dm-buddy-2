<script lang="ts">
	import { newDeity, type Deity } from '../../../../utilities/helpers/deityHelper';
	import { getOrg, getOrgs } from '../../../../utilities/helpers/orgHelper';
	import Button from '../../button/Button.svelte';
	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';

	export let editing = false;
	export let deity: Deity = newDeity();

	export let submit: (form: any) => void;
	export let name: string = '';
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if deity.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={deity.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={deity.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={deity.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="type"
						bind:value={deity.type}
						placeholder="Type"
						label="Type:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="alignment"
						bind:value={deity.alignment}
						placeholder="LG/NG/CG"
						label="Alignment:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>
				<SectionWrapper>
					<Title text="Description" />
					<Textarea
						name="description"
						bind:value={deity.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Affiliated Organizations" />
					{#each deity.affiliatedOrgs as org, i}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Select
								name={`org-id-${i}`}
								bind:value={org.id}
								label="Organizations:"
								labelClass="text-sm font-semibold"
							>
								{#each getOrgs() as s}
									<option value={s.id}>{s.name}</option>
								{/each}
							</Select>
							<Input
								name={`org-data-${i}`}
								bind:value={org.data}
								placeholder="e.g. 'Church or Cult'"
								label="Details:"
								labelClass="text-sm font-semibold"
							/>
							<Button
								text="Delete"
								type="secondary"
								size="small"
								colour="red"
								click={() => {
									deity.affiliatedOrgs = deity.affiliatedOrgs.filter((_, index) => index !== i);
								}}
							/>
						</span>
					{/each}
					<span>
						<button
							type="button"
							class="bg-green-500 rounded px-4 mt-2"
							on:click={() => {
								deity.affiliatedOrgs = [...deity.affiliatedOrgs, { id: 0, data: '' }];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={deity.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					<span class="flex flex-col items-center">
						{#if deity.imageUrl}
							<Image bind:value={deity.imageUrl} />
						{/if}
						<p class="text-2xl font-semibold">{deity.name}</p>
						<p class="text-md italic">{deity.type}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={deity.description === ''}>
					<Title text="Description" />
					<span class="">
						{deity.description}
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={deity.affiliatedOrgs.length === 0}>
					<Title text="Affiliated Organizations" />
					<ul class="list-disc px-4">
						{#each deity.affiliatedOrgs as orgs}
							<li class="list-item">
								<a href={`/places/${orgs.id}`} class="font-semibold">
									{getOrg(orgs.id)?.name ?? 'Unknown'}
								</a>
								<span class="italic">({orgs.data})</span>
							</li>
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={deity.notes === ''}>
					<Title text="Notes" />
					<span class="font-semibold">
						{deity.notes}
					</span>
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							deity.additionalInfo = [...deity.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#if deity.additionalInfo.length > 0}
					{#each deity.additionalInfo as { title, data }, i}
						<span class="mb-2 w-full">
							<Entry
								{editing}
								bind:title
								bind:data
								deleteModule={() => {
									deity.additionalInfo = deity.additionalInfo.filter((_, index) => index !== i);
								}}
								save={() => {
									deity.additionalInfo = [...deity.additionalInfo];
								}}
							/>
						</span>
					{/each}
				{:else}
					<p>No Additional Info</p>
				{/if}
			</div>
		</div>
	</Layout>
</form>
