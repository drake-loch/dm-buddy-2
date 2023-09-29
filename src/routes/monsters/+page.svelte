<script>
	import { goto } from '$app/navigation';
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Table from '../../components/common/Table/Table.svelte';
	import Button from '../../components/common/button/Button.svelte';
	import { getNPCs } from '../../utilities/helpers/dataManager';

	const npcs = getNPCs();
</script>

<PageLayout>
	<div class="w-full p-2 md:p-0 md:flex md:flex-col md:items-center overflow-hidden">
		<h1 class="text-3xl mb-12">Monsters</h1>
		<div class="w-full md:w-1/2 flex justify-center">
			<h3>Page Coming soon....</h3>
		</div>
	</div>
</PageLayout>
