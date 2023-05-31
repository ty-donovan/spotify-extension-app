// SPOTIFY API METHODS

async function getTopArtistsByTimeRange(token, timeRange) {
    const result = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        throw new Error(`Failed to retrieve top artists: ${result.status} ${result.statusText}`);
    }

    const data = await result.json();
    return data.items;
}

async function getTopArtists(timeRange) {
    const topArtists = await getTopArtistsByTimeRange(accessToken, timeRange);

    return topArtists.map(artist => ({
        image: artist.images[0].url,
        name: artist.name,
        popularity: artist.popularity,
    }));
}


async function getTopTracksByTimeRange(token, timeRange) {
    const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=16`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
        throw new Error(`Failed to retrieve top tracks: ${result.status} ${result.statusText}`);
    }

    const data = await result.json();
    return data.items;
}

async function getTopTracks(timeRange) {
    const topTracks = await getTopTracksByTimeRange(accessToken, timeRange);

    return topTracks.map(track => ({
        image: track.album.images[0].url,
        name: track.name,
        time: formatTime(track.duration_ms),
        popularity: track.popularity,
    }));
}

function formatTime(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function getLikedSongs(token) {
    console.log("fetching most recent 30 liked songs");

    const result = await fetch("https://api.spotify.com/v1/me/tracks?limit=30", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

modules.exports = { getLikedSongs, getTopArtists, getTopArtistsByTimeRange, getTopTracks, getTopTracksByTimeRange };