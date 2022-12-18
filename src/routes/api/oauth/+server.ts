import { githubAuth, googleAuth } from '$lib/server/lucia'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, cookies }) => {
	const provider = url.searchParams.get('provider')?.toLowerCase()

	if (provider === 'github' || provider === 'google') {
		const [url, state] =
			provider === 'google'
				? googleAuth.getAuthorizationUrl()
				: githubAuth.getAuthorizationUrl()

		cookies.set('oauth_state', state, {
			path: '/',
			maxAge: 60 * 60
		})

		return new Response(null, {
			status: 302,
			headers: {
				location: url
			}
		})
	}

	return new Response(null, {
		status: 400
	})
}
