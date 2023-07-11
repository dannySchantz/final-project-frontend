import {isLoggedIn} from '../utils/auth.js'
export const ssr = false;

export async function load(){
    await isLoggedIn();
}
