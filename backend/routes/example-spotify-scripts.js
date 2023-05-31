const clientId = "c5f9d12227c1413fbe60e6e562f054ec"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    console.log("No code in URL");
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    console.log(profile);
    // populateUI(profile);
}

export async function redirectToAuthCodeFlow(clientId) {
    console.log("redirecting to auth code flow");

    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");

    // change scope to get different data
    // params.append("scope", "user-read-private user-read-email");
    params.append("scope", "user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


// get Access token
export async function getAccessToken(clientId, code) {
    console.log("getting access token");

    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

/* fetching endpoints */
/* profile = https://api.spotify.com/v1/me

    top 15 artists long term = https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=15
    top 15 artists 6 months term = https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=15
    top 15 artists 1 month term = https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=15
    scope = user-top-read

    top 20 tracks long term = https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20
    top 20 tracks 6 months term = https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20
    top 20 tracks 1 month term = https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20
    scope = user-top-read

    most recent 30 liked songs = https://api.spotify.com/v1/me/tracks?limit=30
    scope = user-library-read
*/


async function fetchProfile(token) {
    console.log("fetching profile");

    // const result = await fetch("https://api.spotify.com/v1/me", {
    //     method: "GET", headers: { Authorization: `Bearer ${token}` }
    // });

    const result = await fetch("https://api.spotify.com/v1/me/tracks?limit=30", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

// function populateUI(profile) {
//     document.getElementById("displayName").innerText = profile.display_name;
//     console.log(profile);

//     if (profile.images[0]) {
//         const profileImage = new Image(200, 200);
//         profileImage.src = profile.images[0].url;
//         document.getElementById("avatar").appendChild(profileImage);
//         document.getElementById("imgUrl").innerText = profile.images[0].url;
//     }
//     document.getElementById("id").innerText = profile.id;
//     document.getElementById("email").innerText = profile.email;
//     document.getElementById("uri").innerText = profile.uri;
//     document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url").innerText = profile.href;
//     document.getElementById("url").setAttribute("href", profile.href);
// }