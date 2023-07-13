import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
export async function load({ fetch, params },) {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/posts/countryTag/${params.slug}`)
    const res = await resp.json();
    if (resp.status == 200) {
        return {
            posts: res,
            reformattedCountry: reformatCountryName(params.slug),
            reformattedTag: reformatTagName(params.slug)
        }
    } else {
        return {
            posts: []
        }   
    } 
}

function reformatCountryName(countryTagName) {
    const [country, experience] = countryTagName.split('_');
    const formattedCountryName = `${country.charAt(0).toUpperCase()}${country.slice(1)}`; 

    return formattedCountryName
}
function reformatTagName(countryTagName) {
    const [country, experience] = countryTagName.split('_');
    const formattedExperienceName =`${experience.charAt(0).toUpperCase()}${experience.slice(1)}`; 

    return formattedExperienceName
}