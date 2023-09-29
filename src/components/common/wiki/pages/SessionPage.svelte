<script lang="ts">
	import {
		getCampaigns,
		getQuests,
		newSession,
		saveSession,
		type Session
	} from '../../../../utilities/helpers/campaignHelper';
	import { getAllBeings } from '../../../../utilities/helpers/dataManager';
	import { getOrgs, newOrg, type Org } from '../../../../utilities/helpers/orgHelper';
	import {
		getPlaces,
		newPlace,
		savePlace,
		type Place
	} from '../../../../utilities/helpers/placeHelper';

	import Layout from '../components/Layout.svelte';
	import Entry from '../components/common/Entry.svelte';
	import Image from '../components/common/Image.svelte';
	import Link from '../components/common/Link.svelte';
	import SectionWrapper from '../components/common/SectionWrapper.svelte';
	import Text from '../components/common/Text.svelte';
	import Title from '../components/common/Title.svelte';
	import Input from '../components/formControl/Input.svelte';
	import Multiselect from '../components/formControl/Multiselect.svelte';
	import Select from '../components/formControl/Select.svelte';
	import Textarea from '../components/formControl/Textarea.svelte';

	export let editing = false;
	export let session: Session = newSession();

	export let submit: (form: any) => void;
	export let name: string = '';

	const beings = getAllBeings();
</script>

<form action="submit" on:submit={submit} id={name} class="w-full">
	<Layout>
		<div slot="panel" class="space-y-2">
			{#if editing}
				<SectionWrapper>
					<Input
						name="name"
						bind:value={session.name}
						placeholder="Name"
						label="Name:"
						labelClass="text-sm font-semibold"
					/>
				</SectionWrapper>

				<SectionWrapper>
					<Title text="Notes" />
					<Textarea name="notes" value={session.notes} inputClass="w-full" />
				</SectionWrapper>
			{:else}
				<SectionWrapper>
					<span class="flex flex-col items-center">
						<p class="text-2xl font-semibold">{session.name}</p>
					</span>
				</SectionWrapper>

				<SectionWrapper hidden={session.notes === ''}>
					<Title text="Rewards" />
				</SectionWrapper>

				<SectionWrapper hidden={session.notes === ''}>
					<Title text="Notes" />
					<Text text={session.notes} />
				</SectionWrapper>
			{/if}
		</div>

		<div slot="main" class="space-y-4">
			<h1 class="text-4xl font-bold border-b-2 pb-2 px-4">{session.name}</h1>
			<div>
				<span class="mb-2 w-full">
					<Entry
						{editing}
						title="Notes"
						titleEditable={false}
						bind:data={session.notes}
						save={() => {
							session.notes = session.notes;
							saveSession(session);
						}}
					/>
				</span>
			</div>
		</div>
	</Layout>
</form>
