<script lang="ts">
	export let value: string | undefined = undefined;
	export let size: number = 150;
	export let alt: string = '';
</script>

<span class={`w-[${size}px] h-[${size}px] bg-gray-300`}>
	<img src={value} {alt} class="w-full h-full object-cover shadow-md" />
</span>
