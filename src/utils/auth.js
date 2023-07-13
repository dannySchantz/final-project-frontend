import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

const emptyAuth = {
  'accessToken': '',
};
const emptyUserId = {
    'userId': '',
};


export function logOut() {
  localStorage.setItem('auth', JSON.stringify(emptyAuth));
  localStorage.setItem('userId',JSON.stringify(emptyUserId))
  loggedIn.set(false);
  return true;
}

export function goToPostPage(postId) {
    goto(`/posts/${postId}`)
}

export const loggedIn = writable(false);


export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return JSON.parse(auth)["accessToken"]
  }
  return null;
}

export async function logInUser(email, password) {
    const resp = await fetch(
        PUBLIC_BACKEND_BASE_URL + '/auth',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }
    );
    const res = await resp.json();
    if (resp.status === 200) {
        localStorage.setItem(
            'auth',
            JSON.stringify({
                'accessToken': res.accessToken,
            })
        );

        localStorage.setItem(
            'userId',
            JSON.stringify({
                'userId': res.userId
            })
        );
        loggedIn.set(true)
        return {
            success: true,
            res: res,
        };
    }
    return {
        success: false,
        res: res
    };
}

export async function isLoggedIn() {
    if (!getTokenFromLocalStorage()) {
        return false;
    } loggedIn.set(true)
    return true
}   