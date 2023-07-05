<script lang="ts">
	export let headers: string[] = [];
	export let rows: { [key: string]: { value: string; link?: string } }[] = [];
	export let _class = '';

	$: _rows = rows.map((row) => {
		const newRow: { [key: string]: { value: string; link?: string } } = {};
		headers.forEach((header) => {
			const h = header.toLowerCase();
			newRow[h] = row[h];
		});
		return newRow;
	});
</script>

<table class={`border ${_class}`}>
	<thead>
		<tr>
			{#each headers as header}
				<th class="border">{header}</th>
			{/each}
			{#if $$slots.action}
				<th class="border">Actions</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each _rows as row, i}
			<tr class={`${i % 2 ? 'bg-gray-600' : ''}`}>
				{#each Object.values(row) as cell}
					{#if cell?.link}
						<td class={`text-center px-1 text-ellipsis`}>
							<a class="text-blue-400 underline" href={cell.link}>{cell?.value}</a>
						</td>
					{:else}
						<td class="text-center px-1 py-4">{cell?.value}</td>
					{/if}
				{/each}
				{#if $$slots.action}
					<slot name="action" {row} />
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
