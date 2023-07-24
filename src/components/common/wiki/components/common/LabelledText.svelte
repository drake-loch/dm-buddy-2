<script lang="ts">
	export let value: string = '';
	export let label: string | undefined = undefined;
</script>

<span class="text-sm block">
	<span class="text-black font-semibold">{label}</span>
	<span class="italic">{value}</span>
</span>
