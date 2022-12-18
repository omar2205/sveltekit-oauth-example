import lucia from 'lucia-auth'
import prisma from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'
import { PrismaClient } from '@prisma/client'

import github from '@lucia-auth/oauth/github'
import google from '@lucia-auth/oauth/google'
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private'

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		}
	}
})

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
})

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: 'http://localhost:5173/api/oauth/google'
})

export type Auth = typeof auth
