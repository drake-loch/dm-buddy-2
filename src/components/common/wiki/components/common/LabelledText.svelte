<script lang="ts">
	export let value: string = '';
	export let label: string | undefined = undefined;
</script>

{#if value !== ''}
	<span class="text-sm flex w-full gap-2">
		<span class="text-black font-semibold text-left w-1/4">{label}</span>
		<span class="italic w-3/4">{value}</span>
	</span>
{:else if $$slots.default}
	<span class="text-sm flex w-full gap-2">
		<span class="text-black font-semibold text-left w-1/4">{label}</span>
		<span class="italic w-3/4">
			<slot />
		</span>
	</span>
{/if}
