<script lang="ts">
	export let value: string = '';
	export let title: string | undefined = undefined;
</script>

<span class="">
	<span class="text-black font-semibold text-left">{title}</span>
	<span class="italic text-sm">{value}</span>
</span>
