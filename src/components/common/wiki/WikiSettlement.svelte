<script lang="ts">
	import { getNPCs, getNPCsAndChars } from '../../../utilities/helpers/dataManager';
	import { newSettlement, type Settlement } from '../../../utilities/helpers/settlementHelper';
	import Layout from './components/Layout.svelte';
	import Image from './components/common/Image.svelte';
	import LabelledList from './components/common/LabelledList.svelte';
	import LabelledText from './components/common/LabelledText.svelte';
	import Checkbox from './components/formControl/Checkbox.svelte';
	import Input from './components/formControl/Input.svelte';
	import Select from './components/formControl/Select.svelte';

	export let editMode = false;
	export let settlement: Settlement = newSettlement();
	export let submit: (form: any) => void;
	export let name: string = '';

	const people = getNPCsAndChars().map((c) => {
		return {
			value: { id: c.id, type: c.type },
			label: c.fullName,
			action: () => {
				//view character
				// toggleMod('npc', c.id);
			}
		};
	});
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editMode}
				<span class="flex w-full justify-center gap-2">
					<Input
						name="wiki-image"
						bind:value={settlement.imageURL}
						placeholder="URL:"
						label="Image URL"
					/>
				</span>
				<span class="flex w-full justify-center gap-2">
					<Input name="name" value={settlement.name} placeholder="Name:" />
				</span>

				<div class="w-full border-y-2 px-2 py-4 space-y-1">
					<span class="flex w-full gap-2 items-center">
						<Input
							name="population"
							value={settlement.population?.toString()}
							placeholder="Population"
							label="Population:"
							labelClass="text-sm font-semibold"
						/>
					</span>
					<span class="flex w-full gap-2 items-center">
						<Input
							name="government"
							value={settlement.government}
							placeholder="Government"
							label="Government:"
							labelClass="text-sm font-semibold"
						/>
					</span>
					<span class="flex w-full gap-2 items-center">
						<Input
							name="alignment"
							value={settlement.alignment}
							placeholder="Alignment"
							label="Alignment:"
							labelClass="text-sm font-semibold"
						/>
					</span>
					<span class="flex w-full gap-2 items-center">
						<Input
							name="economy"
							value={settlement.economy}
							placeholder="Economy"
							label="Economy:"
							labelClass="text-sm font-semibold"
						/>
					</span>
					<span class="flex w-full gap-2 items-center">
						<Input
							name="languages"
							value={settlement.languages}
							placeholder="Languages"
							label="Languages:"
							labelClass="text-sm font-semibold"
						/>
					</span>
					<p class="text-md text-black">Authority Figures:</p>
					<button
						type="button"
						on:click={() => {
							settlement.authorityFigures.push({
								name: '',
								role: '',
								isLinked: false,
								type: 'npc',
								id: -1
							});
							settlement.authorityFigures = settlement.authorityFigures;
						}}>+</button
					>
					{#each settlement.authorityFigures as figure, i}
						<div class="flex w-full gap-2 items-center">
							{#if figure.isLinked}
								<Select
									name={`authorityFigures[${i}].name`}
									value={figure.name}
									labelClass="text-sm font-semibold"
									selectClass="w-1/2 text-sm"
								>
									{#each people as person}
										<option value={person.label}>{person.label}</option>
									{/each}
								</Select>
							{:else}
								<Input
									name={`authorityFigures[${i}].name`}
									value={figure.name}
									placeholder="Name"
									labelClass="text-sm font-semibold"
									inputClass="w-1/2"
								/>
							{/if}
							<div class="flex items-center w-1/2 gap-2">
								<Input
									name={`authorityFigures[${i}].role`}
									value={figure.role}
									placeholder="Role"
									label="Role:"
									labelClass="text-sm font-semibold"
									inputClass="w-full"
								/>
							</div>
							<div class="flex gap-2">
								<div class="flex">
									<Checkbox
										name={`authorityFigures[${i}].isLinked`}
										bind:value={figure.isLinked}
										label="🔗"
										labelClass=""
									/>
								</div>
								<button
									type="button"
									class="h-full bg-red-500 border border-red-600"
									on:click={() => {
										settlement.authorityFigures = settlement.authorityFigures.filter(
											(f) => f !== figure
										);
										settlement.authorityFigures = settlement.authorityFigures;
									}}>🗑️</button
								>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="w-full h-full flex flex-col items-center">
					<Image value={settlement.imageURL} />
					<p class="text-2xl font-semibold">{settlement.name}</p>
					<p class="text-md italic">{settlement.type}</p>
				</div>
				<div class="w-full border-y-2 px-2 py-4">
					<LabelledText label="Population:" value={settlement.population?.toString()} />
					<LabelledText label="Government:" value={settlement.government} />
					<LabelledText label="Alignment:" value={settlement.alignment} />
					<LabelledText label="Commerce:" value={settlement.economy} />
					<LabelledText label="Languages:" value={settlement.languages} />
					<LabelledList label="Authority Figures:">
						<div class="flex flex-col">
							{#each settlement.authorityFigures as figure}
								{#if figure.id > 0}
									<a href={`/npcs/${figure.id}`}>{figure.name} ({figure.role})</a>,
								{/if}
							{/each}
						</div>
					</LabelledList>
				</div>
			{/if}
		</div>
		<div slot="main" />
	</Layout>
</form>
