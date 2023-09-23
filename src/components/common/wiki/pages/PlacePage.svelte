<script lang="ts">
	import { getCampaigns, getQuests } from '../../../../utilities/helpers/campaignHelper';
	import { getAllBeings } from '../../../../utilities/helpers/dataManager';
	import { newOrg, type Org } from '../../../../utilities/helpers/orgHelper';
	import { newPlace, type Place } from '../../../../utilities/helpers/placeHelper';

	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Multiselect from '../components/formControl/Multiselect.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';

	export let editing = false;
	export let place: Place = newPlace();

	export let submit: (form: any) => void;
	export let name: string = '';

	const beings = getAllBeings();
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2" />

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2">{place.name}</h1>
		</div>
	</Layout>
</form>
