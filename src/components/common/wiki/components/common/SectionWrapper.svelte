<script lang="ts">
	import { classes } from '../../../../../utilities/utilities';

	export let hidden = false;
	export let border = true;
	export let customSpacing = false;
	export let className = '';
</script>

{#if !hidden}
	<div
		class={classes(
			`w-full px-2 pb-4 ${customSpacing ? '' : 'space-y-1'} ${
				border ? 'border-b-2' : ''
			} ${className}`
		)}
	>
		<slot />
	</div>
{/if}
