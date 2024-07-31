// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			access_token: string;
			user: User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
