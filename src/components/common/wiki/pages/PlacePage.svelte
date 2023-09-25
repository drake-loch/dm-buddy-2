<script lang="ts">
	import { getCampaigns, getQuests } from '../../../../utilities/helpers/campaignHelper';
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
	export let place: Place = newPlace();

	export let submit: (form: any) => void;
	export let name: string = '';

	const beings = getAllBeings();
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if place.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={place.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={place.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={place.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="type"
						bind:value={place.type}
						placeholder="Type"
						label="Type:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Description" />
					<Textarea
						name="description"
						bind:value={place.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Details" />

					<Input
						name="population"
						bind:value={place.population}
						placeholder="Population"
						label="Population:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="size"
						bind:value={place.size}
						placeholder="Size"
						label="Size:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="alignment"
						bind:value={place.alignment}
						placeholder="Alignment"
						label="Alignment:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Authority" />
					{#each place.authorityFigures as leader}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Select
								name={`leaderType-${leader.type}-${leader.id}`}
								bind:value={leader.type}
								label="Title:"
								labelClass="text-sm font-semibold"
							>
								<option value="none">None</option>
								<option value="custom">Custom</option>
								<option value="npc">NPC</option>
								<option value="character">PC</option>
							</Select>
							{#if leader.type === 'custom'}
								<Input
									name={`leaderName-${leader.type}-${leader.id}`}
									bind:value={leader.name}
									placeholder="e.g. 'King Arthur'"
									label="Name:"
									labelClass="text-sm font-semibold"
								/>
							{:else if leader.type === 'npc' || leader.type === 'character'}
								<Select
									name={`leaderId-${leader.type}-${leader.id}`}
									bind:value={leader.id}
									label="Title:"
									labelClass="text-sm font-semibold"
								>
									{#each beings.filter((b) => b.type === leader.type) as being}
										<option value={being.id}>{being.name}</option>
									{/each}
								</Select>
							{/if}
							<Input
								name={`leaderRole-${leader.type}-${leader.id}`}
								bind:value={leader.role}
								placeholder="e.g. 'Accountant'"
								label="Role:"
								labelClass="text-sm font-semibold"
							/>
						</span>
					{/each}
					<span>
						<button
							type="button"
							class="bg-green-500 rounded px-4 mt-2"
							on:click={() => {
								place.authorityFigures = [
									...place.authorityFigures,
									{ type: 'none', name: '', id: 0, role: '' }
								];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Economy" />
					<Textarea
						name="economy"
						bind:value={place.economy}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Organizations" />
					{#each place.organizations as org, i}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Select
								name={`org-id-${i}`}
								bind:value={org}
								label="Organization:"
								labelClass="text-sm font-semibold"
							>
								{#each getOrgs() as or}
									<option value={or.id}>{or.name}</option>
								{/each}
							</Select>
						</span>
					{/each}
					<span>
						<button
							type="button"
							class="bg-green-500 rounded px-4 mt-2"
							on:click={() => {
								place.organizations = [...place.organizations, -1];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Places" />
					{#each place.places as p, i}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Select
								name={`subPlace-id-${i}`}
								bind:value={p}
								label="Places:"
								labelClass="text-sm font-semibold"
							>
								{#each getPlaces() as pl}
									<option value={pl.id}>{pl.name}</option>
								{/each}
							</Select>
						</span>
					{/each}
					<span>
						<button
							type="button"
							class="bg-green-500 rounded px-4 mt-2"
							on:click={() => {
								place.places = [...place.places, -1];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={place.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<!--  -->

				<SectionWrapper>
					{#if place.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={place.imageUrl} />
						</span>
					{/if}
					<span class="flex flex-col items-center">
						<p class="text-2xl font-semibold">{place.name}</p>
						<p class="text-md italic">{place.type}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Description" />
					<Text text={place.description} />
				</SectionWrapper>

				<SectionWrapper hidden={!place.population && place.size === '' && place.alignment === ''}>
					<Title text="Details" />

					<Text label="Population:" text={`${place.population}`} />
					<Text label="Size:" text={place.size} />
					<Text label="Alignment:" text={place.alignment} />
				</SectionWrapper>

				<SectionWrapper hidden={place.authorityFigures.length === 0}>
					<Title text="Authority" />
					<ul class="list-disc px-4">
						{#each place.authorityFigures as leader}
							<li class="list-item w-full pt-1">
								<span class="flex w-full">
									{#if leader.type === 'custom'}
										<Text text={leader.name} className="w-fit" />
										<Text text={`(${leader.role})`} className="w-fit" />
									{:else if leader.type === 'npc' || leader.type === 'character'}
										<Link
											href={`/npcs/${leader.id}`}
											text={beings.find((b) => b.id === leader.id && b.type === leader.type)
												?.name ?? 'Unknown'}
											className="w-fit"
										/>
										<Text text={`(${leader.role})`} className="w-fit" />
									{/if}
								</span>
							</li>
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={place.economy === ''}>
					<Title text="Economy" />
					<Text text={place.economy} />
				</SectionWrapper>

				<SectionWrapper hidden={place.organizations.length === 0}>
					<Title text="Organizations" />
					{#each place.organizations as org, i}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Text
								label="Organization:"
								text={getOrgs().find((o) => o.id === org)?.name ?? 'Unknown'}
							/>
						</span>
					{/each}
				</SectionWrapper>

				<SectionWrapper hidden={place.notes === ''}>
					<Title text="Notes" />
					<Text text={place.notes} />
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2">{place.name}</h1>
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							place.additionalInfo = [...place.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each place.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								place.additionalInfo = place.additionalInfo.filter((_, index) => index !== i);
							}}
							save={() => {
								place.additionalInfo = [...place.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
