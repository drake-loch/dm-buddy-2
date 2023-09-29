<script lang="ts">
	export let text: string;
	export let link: string;
</script>

<a
	href={link}
	class="w-24 h-16 bg-slate-600 flex justify-center items-center rounded-md border border-gray-500 hover:bg-gray-700"
>
	{text}
</a>

<style>
	a {
		text-decoration: none;
		color: white;
	}
	a:hover {
		color: rgb(185, 231, 255);
	}
</style>
