<script lang="ts">
	import { newEmptyLore, type Lore } from '../../../../utilities/helpers/loreHelper';

	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Text from '../components/common/Text.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';

	export let editing = false;
	export let lore: Lore = newEmptyLore();

	export let submit: (form: any) => void;
	export let name: string = '';
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					{#if lore.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={lore.imageUrl} />
						</span>
					{/if}
					<Input
						name="imageUrl"
						bind:value={lore.imageUrl}
						placeholder="URL"
						label="Image URL:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="name"
						bind:value={lore.title}
						placeholder="Title"
						label="Title:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="type"
						bind:value={lore.type}
						placeholder="Type"
						label="Type:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Description" />
					<Textarea
						name="description"
						bind:value={lore.description}
						inputClass="w-full"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={lore.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					{#if lore.imageUrl}
						<span class="flex w-full justify-center">
							<Image value={lore.imageUrl} />
						</span>
					{/if}
					<span class="flex flex-col items-center">
						<p class="text-2xl font-semibold">{lore.title}</p>
						<p class="text-md italic">{lore.type}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={lore.description === ''}>
					<Title text="Description" />
					<Text text={lore.description} />
				</SectionWrapper>

				<SectionWrapper hidden={lore.notes === ''}>
					<Title text="Notes" />
					<Text text={lore.notes} />
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-4">{lore.title}</h1>
			{#if editing}
				<span class="flex gap-2">
					<button
						type="button"
						class="bg-green-500 rounded px-4 mt-2"
						on:click={() => {
							lore.additionalInfo = [...lore.additionalInfo, { title: '', data: '' }];
						}}>Add Article</button
					>
				</span>
			{/if}
			<div>
				{#each lore.additionalInfo as { title, data }, i}
					<span class="mb-2 w-full">
						<Entry
							{editing}
							bind:title
							bind:data
							deleteModule={() => {
								lore.additionalInfo = lore.additionalInfo.filter((_, index) => index !== i);
							}}
							save={() => {
								lore.additionalInfo = [...lore.additionalInfo];
							}}
						/>
					</span>
				{/each}
			</div>
		</div>
	</Layout>
</form>
