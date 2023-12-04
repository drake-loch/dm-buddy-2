<script lang="ts">
	import { goto } from '$app/navigation';
	import PageLayout from '../../../components/common/PageLayout/PageLayout.svelte';
	import MonsterPage from '../../../components/common/wiki/pages/MonsterPage.svelte';
	import ToolbarIi from '../../../components/toolbarV2/ToolbarII.svelte';
	import {
		getMonster,
		newEmptyMonster,
		saveMonster
	} from '../../../utilities/helpers/monsterHelper/monsterHelper';

	export let data;

	const FORM_NAME = 'monster-form';

	const isNew = Number.isNaN(data.id);

	let editing = isNew ?? false;

	let monster = isNew ? newEmptyMonster() : getMonster(data.id);

	const submit = (form: any) => {
		form.preventDefault();
		const values = Object.fromEntries(new FormData(form.target));
		monster.name = values?.name.toString() ?? monster.name;
		monster.imageUrl = values?.imageUrl.toString() ?? monster.imageUrl;
		monster.type = values?.type.toString() ?? monster.type;
		monster.notes = values?.notes.toString() ?? monster.notes;
		monster.alignment = values?.alignment.toString() ?? monster.alignment;
		monster.size = values?.size.toString() ?? monster.size;
		monster.difficulty = values?.difficulty.toString() ?? monster.difficulty;
		monster.speed = values?.speed.toString() ?? monster.speed;
		monster.armourClass.value = +values?.armourClass.toString() ?? monster.armourClass.value;
		monster.armourClass.source = values?.armourClassSource.toString() ?? monster.armourClass.source;
		monster.hitPoints.base = +values?.hitPoints.toString() ?? monster.hitPoints.base;
		monster.hitPoints.dice = values?.hitPointsDice.toString() ?? monster.hitPoints.dice;
		monster.hitPoints.modifier =
			+values?.hitPointsModifier.toString() ?? monster.hitPoints.modifier;
		monster.initiative = +values?.initiative.toString() ?? monster.initiative;
		monster.savingThrows = values?.savingThrows.toString() ?? monster.savingThrows;
		monster.skills = values?.skills.toString() ?? monster.skills;
		monster.vulnerabilities = values?.vulnerabilities.toString() ?? monster.vulnerabilities;
		monster.resistances = values?.resistances.toString() ?? monster.resistances;
		monster.immunity = values?.immunity.toString() ?? monster.immunity;
		monster.languages = values?.languages.toString() ?? monster.languages;

		editing = false;

		const id = saveMonster(monster);
		if (+data.id !== id) {
			goto(`/monsters/${id}`);
		}
	};
</script>

<PageLayout windowTitle={`Monsters - ${isNew ? 'New Monster' : monster.name}`}>
	<ToolbarIi slot="sidebar" formName={FORM_NAME} bind:editing />
	<MonsterPage bind:monster {editing} {submit} name={FORM_NAME} />
</PageLayout>
