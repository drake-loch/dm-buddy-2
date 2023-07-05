<script lang="ts">
	import { getNPCs } from '../../../utilities/helpers/dataManager';

	const npcs = getNPCs();
</script>

<div class="flex flex-col">
	<!-- items -->
	<span class="">
		<a href="/"> Home </a>
	</span>
	<span class="">
		<a href="/npcs">NPCs</a>
	</span>
	<span class="">
		<a href="/characters">Characters</a>
	</span>
	<span class="">
		<a href="/settlements">Settlements</a>
	</span>
	<span class="">
		<a href="/campaigns">Campaigns</a>
	</span>
	<span class="">
		<a href="/quests">Quests</a>
	</span>
	<span class="">
		<a href="/sessions">Sessions</a>
	</span>
</div>
