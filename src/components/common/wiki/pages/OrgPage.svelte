<script lang="ts">
	import { getCampaigns } from '../../../../utilities/helpers/campaignHelper';
	import { getAllBeings } from '../../../../utilities/helpers/dataManager';
	import { newOrg, type Org } from '../../../../utilities/helpers/orgHelper';
	import { getPlace, getPlaces } from '../../../../utilities/helpers/placeHelper';
	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Multiselect from '../components/formControl/Multiselect.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';

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
					<Input
						name="imageUrl"
						bind:value={org.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={org.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="type"
						bind:value={org.type}
						placeholder="Type"
						label="Type:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="motto"
						bind:value={org.motto}
						placeholder="Motto"
						label="Motto:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>
				<SectionWrapper>
					<Title text="Description" />
					<Textarea
						name="description"
						bind:value={org.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Leader" />
					{#each org.leaders as leader}
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
								org.leaders = [...org.leaders, { type: 'none', name: '', id: 0, role: '' }];
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
									{#each beings.filter((b) => b.type === member.type) as being}
										<option value={being.id}>{being.name}</option>
									{/each}
								</Select>
							{/if}
							<Input
								name={`memberRole-${member.type}-${member.id}`}
								bind:value={member.role}
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
								org.members = [...org.members, { type: 'none', name: '', id: 0, role: '' }];
							}}>Add</button
						>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Places" />
					{#each org.places as place, i}
						<span class="flex flex-col w-full gap-2 border-b pb-2 pt-1">
							<Select
								name={`place-id-${i}`}
								bind:value={place.id}
								label="Place:"
								labelClass="text-sm font-semibold"
							>
								{#each getPlaces() as s}
									<option value={s.id}>{s.name}</option>
								{/each}
							</Select>
							<Input
								name={`place-role-${i}`}
								bind:value={place.role}
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
								org.places = [...org.places, { id: 0, role: '' }];
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
				<SectionWrapper>
					<span class="flex flex-col items-center">
						{#if org.imageUrl}
							<Image bind:value={org.imageUrl} />
						{/if}
						<p class="text-2xl font-semibold">{org.name}</p>
						<p class="text-md italic">{org.type}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={org.description === ''}>
					<Title text="Description" />
					<span class="">
						{org.description}
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={org.leaders.length === 0}>
					<Title text="Leaders" />
					<ul class="list-disc px-4">
						{#each org.leaders as leader}
							<li class="list-item">
								{#if leader.type !== 'custom' && leader.type !== 'none'}
									<a href={`/${leader.type}/${leader.id}`} class="font-semibold">
										{beings.find((b) => b.type === leader.type && b.id === leader.id)?.name ??
											'Unknown'}
									</a>
								{:else}
									<span class="font-semibold">
										{leader.name}
									</span>
								{/if}
								{#if leader.role !== ''}
									<span class="italic">({leader.role})</span>
								{/if}
							</li>
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={org.members.length === 0}>
					<Title text="Members" />
					<ul class="list-disc px-4">
						{#each org.members as member}
							<li class="list-item">
								{#if member.type !== 'custom' && member.type !== 'none'}
									<a href={`/${member.type}s/${member.id}`} class="font-semibold">
										{beings.find((b) => b.type === member.type && b.id === member.id)?.name ??
											'Unknown'}
									</a>
								{:else}
									<span class="font-semibold">
										{member.name}
									</span>
								{/if}
								{#if member.role !== ''}
									<span class="italic">({member.role})</span>
								{/if}
							</li>
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={org.quests.length === 0}>
					<Title text="Quests" />
					<ul class="list-disc px-4">
						{#each org.quests as quest, index}
							<span class="font-semibold">
								{getCampaigns().find((q) => q.id === quest)?.name ?? 'Unknown'}
							</span>
							{index + 1 === org.quests.length ? '' : ','}
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={org.places.length === 0}>
					<Title text="Places" />
					<ul class="list-disc px-4">
						{#each org.places as place}
							<li class="list-item">
								<a href={`/places/${place.id}`} class="font-semibold">
									{getPlace(place.id)?.name ?? 'Unknown'}
								</a>
								<span class="italic">({place.role})</span>
							</li>
						{/each}
					</ul>
				</SectionWrapper>

				<SectionWrapper hidden={org.goals === ''}>
					<Title text="Goals" />
					<span class="">
						{org.goals}
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={org.notes === ''}>
					<Title text="Notes" />
					<span class="font-semibold">
						{org.notes}
					</span>
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-2">{org.name}</h1>
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							org.additionalInfo = [...org.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each org.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								org.additionalInfo = org.additionalInfo.filter((_, index) => index !== i);
							}}
							save={() => {
								org.additionalInfo = [...org.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
