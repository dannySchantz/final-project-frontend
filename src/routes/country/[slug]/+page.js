import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
// let countryName = 'Malaysia' 
export async function load({ fetch, params }) {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/posts/country/${params.slug}`)
    const res = await resp.json();
    if (resp.status == 200) {
        return {
            posts: res,
            reformattedCountryName: reformatCountryName(params.slug)
        }
    } else {
        return {
            posts: []
        }   
    } 
}


function reformatCountryName(countryName) {
    let reformattedName = countryName.replace(/-/g, ' ').replace(/(^|\s)\w/g, letter => letter.toUpperCase());
    if (reformattedName === "Virgin Islands British") {
        reformattedName = "Virgin Islands, British"
    } else if ( reformattedName === "Virgin Islands Us") {
        reformattedName = "Virgin Islands, U.S."
    }
    return reformattedName;
  }