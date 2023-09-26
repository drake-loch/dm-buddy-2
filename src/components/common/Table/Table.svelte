<script lang="ts">
	import Input from '../wiki/components/formControl/Input.svelte';

	type T = $$Generic;

	export let data: T[] = [];
	export let columns: {
		title: string;
		labelAccesor: (v: T) => string | number;
		linkAccessor?: (v: T) => string;
	}[] = [];
	export let searchAccessor: ((value: T) => string | number) | undefined = undefined;

	let search: string = '';

	$: _data = data.filter((d) => {
		if (searchAccessor !== undefined && search !== '') {
			return searchAccessor(d).toString().toLowerCase().includes(search.toLowerCase());
		}
		return data;
	});

	function formatColumnHeader(column: string) {
		let formatted = column.charAt(0).toUpperCase() + column.slice(1);
		formatted = formatted.replace(/([A-Z])/g, ' $1');
		return formatted;
	}
</script>

<div class="w-full min-h-[20rem] border-2 rounded-md p-2 bg-gray-800 shadow-lg">
	<div class="w-full p-2 pb-4 flex justify-between items-center">
		<slot name="tools" />
		<span class="w-[14rem]">
			<Input bind:value={search} placeholder="Search" />
		</span>
	</div>
	{#if data.length > 0}
		<table class={`w-full`}>
			<thead>
				<tr>
					{#each columns as column}
						<th class="border-y">
							{formatColumnHeader(column.title)}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each _data as row, i}
					<tr class={`${i % 2 ? 'bg-gray-600' : ''}`}>
						{#each columns as column}
							<td class="py-2 px-4 text-center">
								{#if column.linkAccessor}
									<a href={column.linkAccessor(row)}>{column.labelAccesor(row)}</a>
								{:else}
									{column.labelAccesor(row)}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<slot name="emptyState" />
	{/if}
</div>
