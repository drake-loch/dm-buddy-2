<script lang="ts">
	import Button from '../button/Button.svelte';
	import Input from '../wiki/components/formControl/Input.svelte';

	type T = $$Generic;

	export let data: T[] = [];
	export let columns: {
		title: string;
		labelAccesor: (v: T) => string | number;
		linkAccessor?: (v: T) => string;
	}[] = [];
	export let searchAccessor: ((value: T) => string | number) | undefined = undefined;
	export let maxItems: number = 10;
	let currentPage: number = 0;

	//hasNextPage checks to see if there is another page of data
	//hasPreviousPage checks to see if there is a previous page of data

	$: hasNextPage = currentPage < Math.floor(_data.length / maxItems);
	$: hasPreviousPage = currentPage > 0;

	let search: string = '';

	$: {
		if (currentPage < 0) {
			currentPage = 0;
		}
		if (currentPage > Math.floor(_data.length / maxItems)) {
			currentPage = Math.floor(_data.length / maxItems);
		}
	}

	$: _data = data.filter((d) => {
		if (searchAccessor !== undefined && search !== '') {
			return searchAccessor(d).toString().toLowerCase().includes(search.toLowerCase());
		}
		return data;
	});

	$: pageinatedData = _data.slice(currentPage * maxItems, currentPage * maxItems + maxItems);

	function formatColumnHeader(column: string) {
		let formatted = column.charAt(0).toUpperCase() + column.slice(1);
		formatted = formatted.replace(/([A-Z])/g, ' $1');
		return formatted;
	}
</script>

<div class="w-full flex flex-col mix-h-[35rem] border-2 rounded-md p-2 bg-gray-800 shadow-lg">
	<div class="w-full p-2 pb-4 flex justify-between items-center">
		<slot name="tools" />
		{#if data.length > 0}
			<span class="w-[14rem]">
				<Input bind:value={search} placeholder="Search" />
			</span>
		{/if}
	</div>
	{#if data.length > 0}
		<div class="h-[27rem] overflow-auto">
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
					{#each pageinatedData as row, i}
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
		</div>

		{#if hasPreviousPage || hasNextPage}
			<div class="w-full flex border-t mt-auto">
				<div class="">
					<span class="w-full text-center">Page</span>
					<span class="flex items-center gap-2">
						<Button
							text="<"
							size="tiny"
							type="secondary"
							colour="gray"
							disabled={!hasPreviousPage}
							click={() => {
								if (currentPage > 0) {
									currentPage--;
								}
							}}
						/>
						<span class="w-12 text-center">
							{currentPage + 1} / {Math.floor(_data.length / maxItems) + 1}
						</span>
						<Button
							text=">"
							size="tiny"
							type="secondary"
							colour="gray"
							disabled={!hasNextPage}
							click={() => {
								if (currentPage < Math.floor(_data.length / maxItems)) {
									currentPage++;
								}
							}}
						/>
					</span>
				</div>
			</div>
		{/if}
	{:else}
		<slot name="emptyState" />
	{/if}
</div>
