<script lang="ts">
	import { page } from '$app/stores'
	import { handleSession } from '@lucia-auth/sveltekit/client'
	import '../app.css'

	handleSession(page)
</script>

<nav>
  <a href="/">Home</a>
  <a href="/admin">Admin</a>
</nav>

<slot />

<style>
	a {
		text-decoration: none;
	}
</style>
