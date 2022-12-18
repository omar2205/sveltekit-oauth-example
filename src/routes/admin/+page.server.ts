import { error } from '@sveltejs/kit'
import type { PageServerLoad } from '../$types'

export const load = (async ({ locals }) => {
	const session = await locals.validate()
	if (!session) throw error(401, 'admin only!')
}) satisfies PageServerLoad
