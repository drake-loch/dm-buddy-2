<script lang="ts">
	import PageLayout from '../components/common/PageLayout/PageLayout.svelte';
	import Button from '../components/common/button/Button.svelte';
	import Toolbar from '../components/toolbar/Toolbar.svelte';
</script>

<PageLayout>
	<div class="w-full h-[45rem] flex flex-col justify-center items-center px-4 overflow-hidden">
		<h1 class="text-5xl font-semibold mb-4">Welcome to DM Buddy!</h1>
		<p class="text-center mb-8">
			A tool for Dungeon Masters to help create and manage table top roleplaying games.
		</p>
		<Button href="/places" colour="purple" type="secondary" size="large" text="Get Started" />
	</div>
</PageLayout>
