export class AuthModel {
	username: string
	token: string
	created: Date
	expires: Date
	isAdmin: boolean
	refreshToken: string
}
