import React, { Component } from 'react';
import { Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSpotifyToken } from '../../actions';


class SpotifyCallback extends Component {
	constructor(props) {
		super(props);
		this.state = { done: false };
	}

	componentDidMount() {
		const hash = document.location.hash;
		const hashData = hash.match(/#access_token=(.*)&token_type=Bearer&expires_in=(.*)/);
		const accessToken = hashData[1];
		const expiresIn = hashData[2];
		this.props.setSpotifyToken(accessToken);
		this.setState({ done: true });
	}

	render() {
		if(this.state.done) {
			return <div>
								Redirecting after Spotify callback...
								<Redirect
			            to={{
			              pathname: "/",
			              state: { from: this.props.location }
			            }}
								/>
						</div>;
		}
		else {
			return <div>Redirecting after Spotify callback...</div>
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ setSpotifyToken }, dispatch);
}

export default connect(null, mapDispatchToProps)(SpotifyCallback);
