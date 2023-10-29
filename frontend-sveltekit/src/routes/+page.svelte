<script lang="ts">
	let emailAddress: string;
	let schoolName: string;

	function register() {
		alert(`Email is ${emailAddress} and school name is ${schoolName}`);
	}
</script>

<div class="notification">
	<div class="columns">
		<div class="column">
			<div class="content">
				<h1>Easily Publish Your School Lunch Menus</h1>
				<p>
					We make it easy to publish weekly school lunch menus on the web and provide them to
					students and parents in a mobile friendly format.
				</p>
				<p>Just set the details and hit publish! Register and get started today!</p>
			</div>
		</div>
		<div class="column">
			<div class="content">
				<h3>Register Now</h3>
				<div class="field">
					<label class="label">Email Address</label>
					<div class="control">
						<input
							type="text"
							placeholder="Enter your email address"
							class="input"
							bind:value={emailAddress}
						/>
					</div>
				</div>
				<div class="field">
					<label class="label">School Name</label>
					<div class="control">
						<input
							type="text"
							placeholder="Enter your school's name"
							class="input"
							bind:value={schoolName}
						/>
					</div>
				</div>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link is-outlined" on:click={register}> Register </button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="container">
	<div class="content" style="line-height: 30px;">
		<center>
			<span>Already registered?</span>
			<!-- TODO: add behavior to navigate to `/admin/manage-menus if user is logged in later -->
			<button class="button is-small is-text">Log In</button>
		</center>
	</div>
</div>
