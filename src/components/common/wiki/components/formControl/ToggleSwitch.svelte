<script>
	export let checked = false;
	export let name = '';
	export let label = '';

	function toggleSwitch() {
		checked = !checked;
		console.log(checked);
	}
</script>

<div class="flex items-center">
	<input {name} type="checkbox" id="toggleSwitch" class="hidden" bind:checked />
	<span class="flex items-center cursor-pointer" on:click={toggleSwitch} on:keydown={toggleSwitch}>
		<div class="relative">
			<div
				class={`block w-10 h-6  rounded-full shadow-inner transition ${
					checked ? 'bg-green-500' : 'bg-gray-400'
				}`}
			/>
			<div
				class={`absolute top-0 bg-white w-6 h-6 rounded-full transition-all ${
					checked ? 'right-0' : 'left-0'
				}`}
			/>
		</div>
		<div class="ml-3 text-gray-700 font-medium">
			{label}
		</div>
	</span>
</div>
