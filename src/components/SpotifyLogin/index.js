import React, { Component } from 'react';

class SpotifyLogin extends Component {

	SPOTIFY_CLIENT_ID = '7c5c8668957b4b629aa5fc99e70bb4ea';
	SPOTIFY_SCOPES = ['user-read-playback-state', 'user-read-currently-playing'];
	SPOTIFY_REDIRECT_URI = `https://perry.sh/spotify/callback`;
	SPOTIFY_SHOW_DIALOGUE = `false`;

	componentDidMount() {
		const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${this.SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${this.SPOTIFY_REDIRECT_URI}&scope=${this.SPOTIFY_SCOPES.join(' ')}&show_dialog=${this.SPOTIFY_SHOW_DIALOGUE}`;
		window.location.href = authorizeURL;
	}

	render() {
		return <div>Redirecting to Spotify Authorization...</div>
	}
}

export default SpotifyLogin;
