<script lang="ts">
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';
	import { onMount } from 'svelte';
	import { add, parseISO, format } from 'date-fns';
	import { PUBLIC_API_ROOT } from '$env/static/public';
	export let data;
	let loading = true;

	// get id param, but that may be in the server loader
	// all other data loads from params as well
	// put into server something like
	// const response = await axios.get(`${process.env.API_ROOT}/api/lunch-week/${routeLunchWeekId}`)
	const seedLunchDays = () => {
		const weekOfDate = parseISO(data.params.lunchWeek.weekOf);
		for (let i = 0; i < 5; i++) {
			// setup a loop to create five days based on the starting weekOf value
			const calculatedDay = add(weekOfDate, { days: i });
			const formattedDay = format(calculatedDay, 'yyyy-MM-dd');

			// check if the DB returned any values in the lunchDay list, don't overwrite if they exist
			if (data.params.lunchWeek.lunchDays.some((x) => x.day === formattedDay)) {
				continue;
			} else {
				// if it doesn't exist, scaffold data for the day
				const lunchDay = {
					day: formattedDay,
					lunchWeekId: data.params.lunchWeek.lunchWeekId,
					menuDetails: null
				};

				// and add to our data
				data.params.lunchWeek.lunchDays.splice(i, 0, lunchDay);
			}
		}
	};

	onMount(async () => {
		seedLunchDays();
		loading = false;
	});

	const save = async () => {
		// do nothing for now
		for (let i = 0; i < data.params.lunchWeek.lunchDays.length; i++) {
			const lunchDay = data.params.lunchWeek.lunchDays[i];
			console.log(lunchDay);
			// check if the item has an assigned ID already, if so, PUT to the API
			if (lunchDay.lunchDayId) {
				const response = await fetch(
					`${PUBLIC_API_ROOT}/lunch-week/${data.params.lunchWeek.lunchWeekId}/lunch-day/update`,
					{
						method: 'PUT',
						body: JSON.stringify({ lunchDay }),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				);
				const json = await response.json();
				console.log(json);
			} else {
				// POST to get a new ID assigned in all other cases
				const response = await fetch(
					`${PUBLIC_API_ROOT}/lunch-week/${data.params.lunchWeek.lunchWeekId}/lunch-day/add`,
					{
						method: 'POST',
						body: JSON.stringify({ lunchDay }),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				);
				const json = await response.json();
				console.log(json);
				lunchDay.lunchDayId = json.lunchDayId; // confirm this will be received correctly
			}
		}
	};

	const togglePublish = async () => {
		// copy out the lunchWeek object as JSON first
		let lunchWeek = JSON.parse(JSON.stringify(data.params.lunchWeek));
		console.log(lunchWeek);
		// toggle publish flag
		lunchWeek.isPublished = !lunchWeek.isPublished;

		// remove the lunchDays array in order to send up the data to the /lunch-week/update/:id endpoint
		delete lunchWeek.lunchDays;
		await fetch(`${PUBLIC_API_ROOT}/lunch-week/update`, {
			method: 'PUT',
			body: JSON.stringify({ lunchWeek }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => console.log(res));
		// TODO: API call request here, could just be a fetch without using the server

		// do a check for 200 response, if 200 is good
		data.params.lunchWeek.isPublished = !data.params.lunchWeek.isPublished;
	};
</script>

<div>
	<nav class="breadcrumb" aria-label="breadcrumbs">
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/admin/manage-menus">Lunch Menu Admin</a>
			</li>
			<li class="is-active">
				<a href="/#">Add school name data</a>
			</li>
		</ul>
	</nav>
</div>
{#if loading}
	<LoadingSpinner />
{:else}
	<section>{JSON.stringify(data.params)}</section>
	<section>
		<div class="buttons">
			<button class="button is-link is-small" name="save" on:click={() => save()}> Save </button>
			<button name="publish" class="button is-text is-small" on:click={() => togglePublish()}>
				{data.params.lunchWeek.isPublished ? 'Unpublish' : 'Publish'}
			</button>
		</div>
	</section>
	<section class="mt-2">
		<div class="columns">
			{#each data.params.lunchWeek.lunchDays as lunchDay}
				<div class="column">
					<div class="field">
						<label class="label" for="menu-details"
							>{format(parseISO(lunchDay.day), 'EEE MM/dd/yyyy')}</label
						>
						<div class="control">
							<textarea
								class="textarea"
								name="menu-details"
								bind:value={lunchDay.menuDetails}
								rows="10"
							/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}
