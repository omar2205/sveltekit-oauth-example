import { githubAuth, auth } from '$lib/server/lucia'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')
	const storedState = cookies.get('oauth_state')

	if (storedState !== state || !code || !state)
		throw new Response(null, { status: 401 })

	try {
		const { createUser, providerUser, existingUser } =
			await githubAuth.validateCallback(code)

		const user =
			existingUser ??
			(await createUser({
				username: providerUser.login
			}))

		const session = await auth.createSession(user.userId)
		locals.setSession(session)

		return new Response(null, {
			status: 302,
			headers: {
				location: '/'
			}
		})
	} catch (err) {
		console.log({ err })
		return new Response(null, {
			status: 501
		})
	}
}
