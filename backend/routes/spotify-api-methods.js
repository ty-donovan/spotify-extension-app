// SPOTIFY API METHODS

async function getTopArtistsByTimeRange(token, timeRange) {
    try {
        const result = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=10`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        const data = await result.json();
        return data.items;
    } catch (error) {
        console.error(`Failed to retrieve top artists: ${error}`);
    }
}

async function getTopArtists(token, timeRange) {
    const topArtists = await getTopArtistsByTimeRange(token, timeRange);
    console.log(topArtists);

    return topArtists.map(artist => ({
        image: artist.images[0].url,
        name: artist.name,
        popularity: artist.popularity,
    }));
}


async function getTopTracksByTimeRange(token, timeRange) {
    try {
        const result = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });

        const data = await result.json();
        return data.items;
    } catch (error) {
        console.error(`Failed to retrieve top tracks: ${error}`);
    }
}

async function getTopTracks(token, timeRange) {
    const topTracks = await getTopTracksByTimeRange(token, timeRange);

    return topTracks.map(track => ({
        image: track.album.images[0].url,
        name: track.name,
        artist: track.artists[0].name,
        time: formatTime(track.duration_ms),
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

    const result = await fetch("https://api.spotify.com/v1/me/tracks?limit=48", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    data = await result.json();
    return data.items.map(item => ({
        image: item.track.album.images[0].url,
        name: item.track.name,
        artist: item.track.artists[0].name,
        time: formatTime(item.track.duration_ms),
    }));
}

module.exports = { getLikedSongs, getTopArtists, getTopArtistsByTimeRange, getTopTracks, getTopTracksByTimeRange };