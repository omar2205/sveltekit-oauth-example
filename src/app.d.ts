// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	type Auth = import('$lib/server/lucia').Auth
	type UserAttributes = {
		username: string
	}
}

/// <reference types="@sveltejs/kit" />
declare namespace App {
	interface Locals {
		validate: import('@lucia-auth/sveltekit').Validate
		validateUser: import('@lucia-auth/sveltekit').ValidateUser
		setSession: import('@lucia-auth/sveltekit').SetSession
	}
}
