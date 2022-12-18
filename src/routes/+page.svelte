<script lang="ts">
	import { invalidateAll } from '$app/navigation'

	import { getUser, signOut } from '@lucia-auth/sveltekit/client'
	const user = getUser()

	const doSignOut = async () => {
		await signOut()
		invalidateAll()
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	This demo uses <a
		href="https://lucia-auth.vercel.app/sveltekit/start-here/getting-started"
		>Lucia Auth + SvelteKit integration</a
	>
</p>

{#if $user}
	<p>You logged in as:</p>
	<pre>{JSON.stringify($user, null, 2)}</pre>
	<button on:click={doSignOut}>Signout</button>
{:else}
	<p>You aren't logged in</p>
{/if}
