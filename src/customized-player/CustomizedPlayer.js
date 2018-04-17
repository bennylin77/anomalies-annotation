import React from 'react';
import ReactPlayer from 'react-player'
import './CustomizedPlayer.css';
import 'bootstrap/dist/css/bootstrap.css';

class CustomizedPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.handleProgress = this._handleProgress.bind(this);
		this.handleDuration = this._handleDuration.bind(this);
		this.handleEnded = this._handleEnded.bind(this);
		this.handleRef = this._handleRef.bind(this);
	}

	_handleProgress(state) {
    this.props.onVideoProgress(state);
  }
	_handleDuration(state) {
    this.props.onVideoDuration(state);
  }
	_handleEnded (state) {
    this.props.onVideoEnded(state);
  }
	_handleRef (player) {
    this.props.onPlayerRef(player);
  }

	render() {
		const playing = this.props.playing
		return(
						<div className='player-wrapper'>
							<ReactPlayer url='https://cdn.rawgit.com/mediaelement/mediaelement-files/4d21a042/big_buck_bunny.mp4'
													 ref={this.handleRef}
													 onProgress={this.handleProgress}
	 											 	 onDuration={this.handleDuration}
													 onEnded ={this.handleEnded }
													 playing = {playing}
													 muted={true}
													 className='customized-player'
													 width='100%'
	          							 height='400px'
													 config={{ file: { attributes: {crossOrigin: 'anonymous'}}}} />
						</div>
					);
	}
}
export default CustomizedPlayer;
