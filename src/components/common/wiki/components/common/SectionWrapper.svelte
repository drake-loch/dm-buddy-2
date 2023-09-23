<script lang="ts">
	export let hidden = false;
</script>

{#if !hidden}
	<div class="w-full border-b-2 px-2 pb-4 space-y-1">
		<slot />
	</div>
{/if}
