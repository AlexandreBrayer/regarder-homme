import { writable } from "svelte/store";
import type { FrontUser} from '$lib/server/models/User';
export type UserContext = FrontUser | undefined;
export const userSession = writable<UserContext>(undefined); 
