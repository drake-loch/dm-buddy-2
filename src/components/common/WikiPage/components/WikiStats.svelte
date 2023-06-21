<script lang="ts">
	import type { Character } from '../../../../utilities/helpers/charHelper';
	import WikiStat from './WikiStat.svelte';
	export let editMode = false;
	export let stats: Character['stats'] = {
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10
	};
</script>

<div class="flex justify-evenly text-sm">
	<!-- str -->
	<WikiStat {editMode} name="STR" value={stats.str} />
	<!-- dex -->
	<WikiStat {editMode} name="DEX" value={stats.dex} />
	<!-- con -->
	<WikiStat {editMode} name="CON" value={stats.con} />
	<!-- int -->
	<WikiStat {editMode} name="INT" value={stats.int} />
	<!-- wis -->
	<WikiStat {editMode} name="WIS" value={stats.wis} />
	<!-- cha -->
	<WikiStat {editMode} name="CHA" value={stats.cha} />
</div>
