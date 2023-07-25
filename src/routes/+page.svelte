<script lang="ts">
	import PageLayout from '../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../components/toolbar/Toolbar.svelte';
</script>

<PageLayout>
	<Toolbar viewNav={true} />
	<div class="w-full md:w-3/4 px-4">
		<h1 class="text-4xl mb-12">Welcome to DM Buddy!</h1>
		<div class="space-y-4">
			<p>
				This is a tool designed for Dungeon Masters to help create and manage table top roleplaying
				games.
			</p>
			<p>
				Data is stored in your browser's local storage, so it will persist between sessions. You can
				also download your data and upload it to other devices.
			</p>
		</div>
	</div>
</PageLayout>
