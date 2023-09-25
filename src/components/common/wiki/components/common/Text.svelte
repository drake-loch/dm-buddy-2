<script lang="ts">
	import { classes } from '../../../../../utilities/utilities';

	export let text: string;
	export let label: string | undefined = undefined;
	export let className: string = '';
</script>

{#if label}
	<span class="flex w-full justify-between gap-2">
		{#if label}
			<p class={`w-1/3 text-black text-sm font-semibold`}>{label}</p>
		{/if}
		<p class={classes(`px-1 w-2/3 text-sm ${className}`)}>{text}</p>
	</span>
{:else}
	<p class={classes(`px-1 w-full text-sm ${className} `)}>{text}</p>
{/if}
