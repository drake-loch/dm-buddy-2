<script lang="ts">
	import { newItem, type Item } from '../../../../utilities/helpers/placeHelper';

	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Input from '../components/formControl/Input.svelte';

	export let editing = false;
	export let item: Item = newItem();

	export let submit: (form: any) => void;
	export let name: string = '';

	function getItemType(item: Item): string {
		return item.type.join(', ');
	}
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					<Input
						name="name"
						bind:value={item.name}
						placeholder="Title"
						label="Title:"
						labelClass="text-sm font-semibold"
					/>
					<Input
						name="type"
						value={getItemType(item)}
						placeholder="Type"
						label="Type:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Input
						name="weight"
						bind:value={item.weight}
						placeholder="Weight"
						label="Weight:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					<span class="flex flex-col items-center">
						<p class="text-2xl font-semibold">{item.name}</p>
						<p class="text-md italic">{item.type}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper>
					<span class="flex flex-col items-center">
						<p class="text-sm font-semibold">Weight</p>
						<p class="text-2xl font-semibold">{item.weight}</p>
					</span>
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-4">{item.name}</h1>
			<div>
				<span class="mb-2 w-full">
					<Entry {editing} titleEditable={false} title="Description" bind:data={item.description} />
				</span>
			</div>
		</div>
	</Layout>
</form>
