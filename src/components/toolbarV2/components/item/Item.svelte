<script lang="ts">
	export let text: string;
	export let colour: 'green' | 'red' | 'blue' | 'yellow' | 'gray' | 'purple' = 'gray';
	export let click = (): void => {};
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let form: string | undefined = undefined;
</script>

<button
	{type}
	{form}
	class={`w-full h-16 ${colour} hover:bg-${colour}-600 rounded-md`}
	on:click={click}>{text}</button
>

<style>
	.green {
		@apply bg-green-500 border border-green-400;
	}
	.green:hover {
		@apply bg-green-600;
	}

	.red {
		@apply bg-red-500 border border-red-400;
	}
	.red:hover {
		@apply bg-red-600;
	}

	.blue {
		@apply bg-blue-500 border border-blue-400;
	}
	.blue:hover {
		@apply bg-blue-600;
	}

	.yellow {
		@apply bg-yellow-500 border border-yellow-400;
	}
	.yellow:hover {
		@apply bg-yellow-600;
	}

	.gray {
		@apply bg-gray-400 border border-gray-300;
	}
	.gray:hover {
		@apply bg-gray-500;
	}

	.purple {
		@apply bg-purple-500 border border-purple-400;
	}
	.purple:hover {
		@apply bg-purple-600;
	}
</style>
