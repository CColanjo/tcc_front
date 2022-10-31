import { IEnvironment } from '~/interfaces/environment.interface'

declare global {
	namespace NodeJS {
		type ProcessEnv = IEnvironment
	}
}

export {}
