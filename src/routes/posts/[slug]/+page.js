import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
// let countryName = 'Malaysia' 
export async function load({ fetch, params }) {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/posts/id/${params.slug}`)
    const res = await resp.json();
    if (resp.status == 200) {
        return {
            post: res,
        }
    } else {
        return {
            post: []
        }   
    } 
}


  