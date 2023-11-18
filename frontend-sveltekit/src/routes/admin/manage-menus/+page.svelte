<script lang="ts">
	let myDate = new Date().getTime();
	import LoadingSpinner from '$lib/LoadingSpinner.svelte';
	import { user } from '../../../stores';
	import { PUBLIC_API_ROOT } from '$env/static/public';
	import Icon from 'svelte-awesome';
	import { times } from 'svelte-awesome/icons';
	export let data;
	// export let form;
	let loading = false;
	let showDeleteModal = false;
	let weekToDelete = {};
	let showCreateModal = false;
	let createWeekOfDate: Date | null = null;

	const openCreateModal = () => {
		showCreateModal = true;
	};

	const createLunchWeek = async () => {
		showCreateModal = false;
		let lunchWeek = {
			weekOf: createWeekOfDate,
			isPublished: false
		};
		try {
			loading = true;

			// POST to the /lunch-week/add endpoint
			const response = await fetch(`${PUBLIC_API_ROOT}/lunch-week/add`, {
				method: 'POST',
				body: JSON.stringify({ lunchWeek }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const responseData = await response.json();
			lunchWeek.lunchWeekId = responseData[0].lunchWeekId;
			data.params.lunchWeek.push(lunchWeek);
			loading = false;
		} catch (e) {
			loading = false;
			console.error(e);
		}
	};

	const openDeleteModal = (lunchWeek: object) => {
		weekToDelete = lunchWeek;
		showDeleteModal = true;
	};

	const deleteLunchWeek = async (lunchWeek: object) => {
		showDeleteModal = false;
		const lunchWeekId = lunchWeek.lunchWeekId;
		// toggle the loading spinner while accessing the delete endpoint
		try {
			loading = true;
			await fetch(`${PUBLIC_API_ROOT}/lunch-week/delete/${lunchWeekId}`, { method: 'DELETE' });
			// clear out the entry from the DOM based on the index position
			const deletedIndex = data.params.lunchWeeks.findIndex((x) => x.lunchWeekId === lunchWeekId);
			// we're modifying props here
			data.params.lunchWeeks.splice(deletedIndex, 1);
			loading = false;
		} catch (e) {
			loading = false;
			console.error(e);
		}
	};
</script>

<h1>Manage menus here</h1>
<button class="button is-text is-small mb-1" on:click={() => openCreateModal()}>
	Add Lunch Week
</button>
<!-- <p>{$user.name}</p> -->
{#if loading}
	<LoadingSpinner />
{:else}
	<table class="table">
		<thead>
			<tr>
				<th>Week of</th>
				<th>Published</th>
				<th>Administer</th>
				<th>Delete Week</th>
			</tr>
		</thead>
	</table>
	{#if data.params}
		{#each data.params.lunchWeeks as week}
			<tr class="lunch-week-container">
				<td>{week.weekOf}</td>
				<td>{week.isPublished}</td>
				<td class="clickable"
					><a href="/admin/manage-menus/week-details/{week.lunchWeekId}"> Manage week</a></td
				>
				<td class="clickable has-text-grey-light" on:click={openDeleteModal(week)}>
					<Icon data={times} />
				</td>
			</tr>
		{/each}
	{:else}
		<div class="empty-table">
			<p>No lunch weeks found.</p>
		</div>
	{/if}
{/if}
<!-- modal confirmation popup-->
<div class={showDeleteModal ? 'modal is-active' : 'modal'}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Warning</p>
			<button class="delete" on:click={() => (showDeleteModal = false)} aria-label="close" />
		</header>
		<section class="modal-card-body">
			Delete Week of {weekToDelete.weekOf}?
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" on:click={deleteLunchWeek(weekToDelete)}>Continue</button>
			<button class="button" on:click={() => (showDeleteModal = false)}>Cancel</button>
		</footer>
	</div>
</div>
<div class={showCreateModal ? 'modal is-active' : 'modal'}>
	<div class="modal-background" />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Create Lunch Week</p>
			<button class="delete" on:click={() => (showCreateModal = false)} aria-label="close" />
		</header>
		<section class="modal-card-body">
			<form>
				<div class="field">
					<label for="date" class="label">Week of</label>
					<div class="control">
						<input
							bind:value={createWeekOfDate}
							name="date"
							type="date"
							class="input"
							placeholder="yyyy-mm-dd"
						/>
						<button class="button is-success">Continue</button>
					</div>
				</div>
			</form>
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" on:click={() => createLunchWeek()}>Continue</button>
			<button class="button" on:click={() => (showCreateModal = false)}>Cancel</button>
		</footer>
	</div>
</div>

<style>
	.clickable {
		cursor: pointer;
	}
</style>
