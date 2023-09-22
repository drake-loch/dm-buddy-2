<script lang="ts">
	import { getCampaigns, getQuests } from '../../../../utilities/helpers/campaignHelper';
	import { getAllBeings, getNPCs } from '../../../../utilities/helpers/dataManager';
	import { newOrg, type Org } from '../../../../utilities/helpers/orgHelper';
	import { getSettlements } from '../../../../utilities/helpers/settlementHelper';
	import Layout from '../components/Layout.svelte';
	import Image from '../components/common/Image.svelte';
	import LabelledText from '../components/common/LabelledText.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Multiselect from '../components/formControl/Multiselect.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';
	import BeingSelector from '../components/otherControl/BeingSelector.svelte';

	export let editing = false;
	export let org: Org = newOrg();

	export let submit: (form: any) => void;
	export let name: string = '';

	const beings = getAllBeings();
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if org.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={org.imageUrl} />
						</span>
					{/if}
					<Input name="imageUrl" bind:value={org.imageUrl} placeholder="URL" label="Image URL:" />
					<Input name="name" bind:value={org.name} placeholder="Name" label="Name:" />
					<Input name="type" bind:value={org.type} placeholder="Type" label="Type:" />
					<Input name="motto" bind:value={org.motto} placeholder="Motto" label="Motto:" />
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Leader" />
					{#each org.leaders as leader}
						<!-- <BeingSelector controlName="leader" being={leader} {beings} /> -->
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
									{#each getAllBeings().filter((b) => b.type === leader.type) as being}
										<option value={being.id}>{being.name}</option>
									{/each}
								</Select>
							{/if}
						</span>
					{/each}
					<span>
						<button
							type="button"
							class="bg-green-500 rounded px-4 mt-2"
							on:click={() => {
								org.leaders = [...org.leaders, { type: 'none', name: '', id: 0 }];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Members" />
					{#each org.members as member}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Select
								name={`memberType-${member.type}-${member.id}`}
								bind:value={member.type}
								label="Title:"
								labelClass="text-sm font-semibold"
							>
								<option value="none">None</option>
								<option value="custom">Custom</option>
								<option value="npc">NPC</option>
								<option value="character">PC</option>
							</Select>
							{#if member.type === 'custom'}
								<Input
									name={`memberName-${member.type}-${member.id}`}
									bind:value={member.name}
									placeholder="e.g. 'King Arthur'"
									label="Name:"
									labelClass="text-sm font-semibold"
								/>
							{:else if member.type === 'npc' || member.type === 'character'}
								<Select
									name={`memberId-${member.type}-${member.id}`}
									bind:value={member.id}
									label="Title:"
									labelClass="text-sm font-semibold"
								>
									{#each getAllBeings().filter((b) => b.type === member.type) as being}
										<option value={being.id}>{being.name}</option>
									{/each}
								</Select>
							{/if}
						</span>
					{/each}
					<span>
						<button
							type="button"
							class="bg-green-500 rounded px-4 mt-2"
							on:click={() => {
								org.members = [...org.members, { type: 'none', name: '', id: 0 }];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Quests" />
					<span class="flex flex-col w-full gap-2 pb-2 pt-1">
						<Multiselect
							{editing}
							label="Quests:"
							bind:values={org.quests}
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
					<Title text="Places" />
					<span class="flex flex-col w-full gap-2 pb-2 pt-1">
						<Multiselect
							{editing}
							label="Places:"
							bind:values={org.places}
							options={getSettlements().map((s) => {
								return {
									label: s.name,
									value: s.id
								};
							}) ?? []}
						/>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Goals" />
					<Textarea
						name="goals"
						value={org.goals}
						placeholder="e.g. 'Help the poor'"
						inputClass="w-full"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={org.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<div class="w-full h-full flex flex-col items-center">
					<Image bind:value={org.imageUrl} />
					<p class="text-2xl font-semibold">{org.name}</p>
					<p class="text-md italic">{org.type}</p>
				</div>
				<div class="w-full border-y-2 px-2 py-4">
					<!-- <LabelledText label="Leader:" value={org.leader.name} /> -->
				</div>
			{/if}
		</div>
		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold">{org.name}</h1>
			<div class="w-full h-64 bg-gray-400">
				<!--  -->
			</div>
		</div>
	</Layout>
</form>
