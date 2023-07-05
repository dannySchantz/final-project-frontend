import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
export async function load({ fetch, params }) {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/posts/tags/${params.slug}`)
    const res = await resp.json();
    if (resp.status == 200) {
        return {
            posts: res,
            slug: params.slug
        }
    } else {
        return {
            posts: []
        }   
    } 
}