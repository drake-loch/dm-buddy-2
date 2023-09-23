<script lang="ts">
	import Item from './components/item/Item.svelte';

	export let formName: string | undefined = undefined;
	export let editing = false;

	let menuIsOpen = editing;
</script>

<div class="relative">
	<span class="w-20 h-8">
		<button
			type="button"
			class={`border rounded-md w-full h-full px-2 transition border-blue-300 ${
				menuIsOpen
					? ' bg-blue-500 border-b-0 rounded-b-none hover:bg-blue-400 unround'
					: 'hover:bg-gray-400 round'
			}`}
			on:click={() => {
				menuIsOpen = !menuIsOpen;
			}}>Toolbar{menuIsOpen ? '' : ''}</button
		>
	</span>
	<div class="absolute">
		<div
			class={`nav-border space-y-2 w-20 transition-all  bg-slate-500 shadow-lg box-border z-10 p-2 overflow-x-hidden ${
				menuIsOpen ? 'open' : 'close'
			}`}
		>
			{#if menuIsOpen}
				<div class="show space-y-2">
					{#if editing}
						<Item text="Save" colour="green" form={formName} type="submit" />
						<Item text="Cancel" colour="gray" click={() => (editing = false)} />
					{:else}
						<Item text="Edit" colour="green" click={() => (editing = true)} />
					{/if}
					<hr />
					<Item text="Settings" colour="blue" />
				</div>
			{/if}
		</div>
		<span class={`w-20 h-8 ${menuIsOpen ? 'show' : 'hide'} `}>
			<button
				type="button"
				class={`border rounded-b-md w-full h-full px-2 md:px-4 transition bg-blue-500 border-blue-300 text-xl ${
					menuIsOpen ? ' hover:bg-blue-400' : 'border-0 cursor-default'
				}`}
				on:click={() => {
					menuIsOpen = false;
				}}>^</button
			>
		</span>
	</div>
</div>

<style>
	.nav-border {
		border: 1px solid #d0d0d0;
		border-top: none;
		border-bottom: none;
	}

	.open {
		min-height: 20rem;
		animation: grow 0.75s ease-in-out;
	}
	.close {
		min-height: 0;
		padding: 0;
		animation: shrink 0.75s ease-in-out;
	}

	.show {
		opacity: 100%;
		animation: show 1s ease-in-out;
	}
	.hide {
		opacity: 0%;
		animation: hide 1s ease-in-out;
	}

	.round {
		border-radius: 0.375rem;
		animation: round 1s ease-in-out;
	}
	.unround {
		border-radius: 0.375rem;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		animation: unround 0.5s ease-in-out;
	}

	@keyframes grow {
		0% {
			min-height: 0;
			opacity: 0%;
		}
		100% {
			min-height: 20rem;
			opacity: 100%;
		}
	}
	@keyframes shrink {
		0% {
			min-height: 20rem;
			opacity: 100%;
		}
		100% {
			min-height: 0;
			opacity: 0%;
		}
	}

	@keyframes show {
		0% {
			opacity: 0%;
		}
		100% {
			opacity: 100%;
		}
	}
	@keyframes hide {
		0% {
			opacity: 100%;
		}
		100% {
			opacity: 0%;
		}
	}

	@keyframes round {
		0% {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		50% {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		100% {
			border-bottom-left-radius: 0.375rem;
			border-bottom-right-radius: 0.375rem;
		}
	}
	@keyframes unround {
		0% {
			border-bottom-left-radius: 0.375rem;
			border-bottom-right-radius: 0.375rem;
		}
		100% {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
</style>
