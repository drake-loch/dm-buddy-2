<script lang="ts">
	export let value: string = '';
	export let label: string | undefined = undefined;
</script>

{#if value !== ''}
	<span class="text-sm w-full space-x-1">
		<span class="text-black font-semibold text-left inline">{label}</span>
		<span class="italic inline">{value}</span>
	</span>
{:else if $$slots.default}
	<span class="text-sm w-full gap-1">
		<span class="text-black font-semibold text-left">{label}</span>
		<span class="italic">
			<slot />
		</span>
	</span>
{/if}
