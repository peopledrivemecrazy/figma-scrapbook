// See https://kit.svelte.dev/docs/types#app

import * as Figma from 'figma-api';
import type { User } from 'figma-api/lib/api-types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			access_token: string | undefined;
			user: User | undefined;
			figma: () => Figma.Api;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
