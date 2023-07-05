<script lang="ts">
	import PageLayout from '../components/common/PageLayout/PageLayout.svelte';
	import Toolbar from '../components/toolbar/Toolbar.svelte';
</script>

<PageLayout>
	<Toolbar viewNav={true} />
	<div class="w-3/4">
		<h1 class="text-4xl mb-12">Welcome to DM Buddy!</h1>
		<div class="">
			<p>
				This is a tool designed to help DMs (or GMs) create and manage table top roleplaying games.
				<br />
				Data is stored in your browser's local storage, so it will persist between sessions. You can
				also download your data and upload it to other devices.
			</p>
		</div>
	</div>
</PageLayout>
