import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
export async function load({ fetch}) {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/posts/featured`)
    const res = await resp.json();
    if (resp.status == 200) {
        return {
            posts: res,
        }
    } else {
        return {
            posts: []
        }   
    } 
}