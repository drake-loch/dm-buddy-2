<script lang="ts">
	export let label: string | undefined = undefined;
</script>

<span class="text-sm flex gap-0.5">
	<span class="text-black font-semibold">{label}</span>
	<slot />
</span>
