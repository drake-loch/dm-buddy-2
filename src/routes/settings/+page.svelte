<script>
	import PageLayout from '../../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../../components/toolbar/Toolbar.svelte';
</script>

<PageLayout>
	<Toolbar viewNav={true} />
	<div class="w-full px-4 md:p-0 md:w-3/4">
		<h1 class="text-4xl mb-12">Settings</h1>
		<div class="">
			<a href="/settings/storage" class="text-blue-500 underline">Storage</a>
		</div>
	</div>
</PageLayout>
