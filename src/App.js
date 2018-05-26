import React, { Component } from 'react';
import './App.css';
import Task from './task/Task'
/*
import Landing from './landing/Landing';
import WithoutAssistance from './without-assistance/WithoutAssistance';
*/
import CaptureFrame from 'capture-frame'

import 'bootstrap/dist/css/bootstrap.css';
import {Alert} from 'reactstrap';

const events = [
	{id: -1, name: 'Select an event' },
  {id: 0, name: 'People running' },
  {id: 1, name: 'People falling down' },
  {id: 2, name: 'People loitering' },
	{id: 3, name: 'People gathering' },
	{id: 4, name: 'People with masks' },
	{id: 5, name: 'Bike passing' },
];

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { alertVisible: false, alertMessage: "", step: 2, played: 0, playing: false, duration: 0,loop: false, seeking: false,
									 selectedEvent: "-1", selectedStart: 0, selectedEnd: 0, indicator1: 0, indicator2: 0, eventTimeList:[] };
		this.onAlertDismiss = this._onAlertDismiss.bind(this);


		this.handleVideoProgress = this._handleVideoProgress.bind(this);
		this.handleVideoDuration = this._handleVideoDuration.bind(this);
		this.handleVideoEnded = this._handleVideoEnded.bind(this);
		this.handleEventTimeAdd = this._handleEventTimeAdd.bind(this);
		this.handleEventTimeDelete = this._handleEventTimeDelete.bind(this);
		this.handleEventTimeInputChange = this._handleEventTimeInputChange.bind(this);
		/*
		this.handlePlay = this._handlePlay.bind(this);
		this.handleEmergence = this._handleEmergence.bind(this);
		this.handleEventTimeDelete = this._handleEventTimeDelete.bind(this);
		this.handleEventSelect = this._handleEventSelect.bind(this);
		this.handleLandingNext = this._handleLandingNext.bind(this);
		this.handleWoAssistNext = this._handleWoAssistNext.bind(this);
		*/
	}
	// handle alert
	_onAlertDismiss() {
	 this.setState({alertVisible: false, alertMessage: "" })
 	}
	/*
	_handleEventSelect(event){
		const value = event.target.value;
		this.setState((prevState, props) => {
			const newSelectedEvents = prevState.selectedEvents
			const index = newSelectedEvents.indexOf(value);
			if (index === -1) {
					newSelectedEvents.push(value);
			} else {
					newSelectedEvents.splice(index, 1);
			}
			return {selectedEvents: newSelectedEvents.sort()};
		});
	}
	_handleLandingNext(){
		if(this.state.selectedEvents.length!==0)
			this.setState({step: 2})
		else
			this.setState({alertVisible: true, alertMessage: "You must select some emergent event(s)" })
	}
	_handleWoAssistNext(event) {
    alert(this.state);
    event.preventDefault();
  }
	_handlePlay(){
			this.setState((prevState, props) => {
				return {playing: !this.state.playing};
			});
	}
	_handleEmergence(){
			const buf = CaptureFrame(this.player.getInternalPlayer())
			const frame = window.URL.createObjectURL(new window.Blob([buf]))
			console.log('captured frame', frame)

			this.setState((prevState, props) => {
				const id = (new Date()).getTime();
				const elapsed = prevState.duration * prevState.played
				return {eventTimeList: [...prevState.eventTimeList, {id: id, elapsed: elapsed, frame: frame}]};
			});
	}
*/
	// video
	handleVideoPlayPause = () => {
	this.setState({ playing: !this.state.playing })
	}
	handleVideoSeekMouseDown = e => {
		this.setState({ seeking: true })
	}
	handleVideoSeekChange = e => {
		this.setState({ played: parseFloat(e.target.value) })
	}
	handleVideoSeekMouseUp = e => {
		this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
	}

	handleVideoSetTimeMouseDown = () =>{

	}
	handleVideoSetTimeChange = e =>{

		const name = e.target.name;
		const value = parseFloat(e.target.value);
		this.setState((prevState, props) => {
			const ind1 = (name ==='indicator1'? value : prevState.indicator1);
			const ind2 = (name ==='indicator2'? value : prevState.indicator2);
			console.log(ind1)
			console.log(ind2)
			const start = Math.min(ind1, ind2);
			const end = Math.max(ind1, ind2);
			return { selectedStart: start, selectedEnd: end, indicator1: ind1, indicator2: ind2 };
		});
	}
	handleVideoSetTimeMouseUp = () =>{
	}

	_handleVideoProgress(state){
		if (!this.state.seeking) {
    	this.setState({played: state.played})
		}
  }
  _handleVideoDuration(duration){
    this.setState({ duration })
  }
	_handleVideoEnded(){
    this.setState({ playing: this.state.loop })
  }

	// event time
	_handleEventTimeAdd(){
		const { selectedEvent, selectedStart, selectedEnd } = this.state;
		if(parseFloat(selectedEvent)==-1){
				this.setState({alertVisible: true, alertMessage: "You must select an event" })
				return;
		}
		this.setState((prevState, props) => {
			const id = (new Date()).getTime();
			const elapsed = prevState.duration * prevState.played
			return { selectedEvent: "-1", eventTimeList: [...prevState.eventTimeList, {id: id, startTime: selectedStart, endTime: selectedEnd, selectedEvent: selectedEvent}]};
		});
	}
	_handleEventTimeDelete(id){
		this.setState((prevState) => {
				const newEventTimeList = prevState.eventTimeList.filter( eventTime => eventTime.id !== id );
				return { eventTimeList: newEventTimeList };
		});
	}
	_handleEventTimeInputChange(e){
		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.setState({[name]: value})
	}
	// player
	playerRef = player => {
    this.player = player
  }





  render() {
		const { playing, played, duration, eventTimeList,
						selectedStart, selectedEnd, selectedEvent,
						indicator1, indicator2 } = this.state;

		return (
			<div>
				<Alert className="fixed-top" color="danger" isOpen={this.state.alertVisible} toggle={this.onAlertDismiss}>{this.state.alertMessage}</Alert>
				<Task playing={playing}
							played={played}
							duration={duration}
							eventTimeList={eventTimeList}
							events={events}
							selectedStart={selectedStart}
							selectedEnd={selectedEnd}
							selectedEvent={selectedEvent}
							indicator1={indicator1}
							indicator2={indicator2}
							onTaskVideoSetTimeMouseDown={this.handleVideoSetTimeMouseDown}
							onTaskVideoSetTimeChange={this.handleVideoSetTimeChange}
							onTaskVideoSetTimeMouseUp={this.handleVideoSetTimeMouseUp}
							onTaskVideoPlayPause={this.handleVideoPlayPause}
							onTaskVideoSeekMouseDown={this.handleVideoSeekMouseDown}
							onTaskVideoSeekChange={this.handleVideoSeekChange}
							onTaskVideoSeekMouseUp={this.handleVideoSeekMouseUp}
							onTaskPlayerRef={this.playerRef}
							onTaskVideoDuration={this.handleVideoDuration}
							onTaskVideoProgress={this.handleVideoProgress}
							onTaskVideoEnded={this.handleVideoEnded}
							onTaskEventTimeAdd={this.handleEventTimeAdd}
							onTaskEventTimeDelete={this.handleEventTimeDelete}
							onTaskEventTimeInputChange={this.handleEventTimeInputChange}
							/>
			</div>
		);




		/*
		if (step===1) {
			return (
				<div>
					<Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onAlertDismiss}>{this.state.alertMessage}</Alert>
					<Landing events={events} onEventSelect={this.handleEventSelect} onLandingNext={this.handleLandingNext}/>
				</div>
			);
		}
		if (step===2) {
			return (
				<div>
					<Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onAlertDismiss}>{this.state.alertMessage}</Alert>
					<WithoutAssistance events={events}
														 selectedEvents={selectedEvents}
														 playing={playing}
														 played={played}
														 duration={duration}
														 onWoAssistRef={this.ref}
														 onWoAssistPlay={this.handlePlay}
														 onWoAssistEmergence={this.handleEmergence}
														 onWoAssistNext={this.handleWoAssistNext}
														 onWoAssistVideoDuration={this.handleVideoDuration}
														 onWoAssistVideoProgress={this.handleVideoProgress}
														 onWoAssistVideoEnded={this.handleVideoEnded}
														 onEventSelect={this.handleEventSelect}
														 eventTimeList={eventTimeList}
														 onWoAssistEventTimeDelete={this.handleEventTimeDelete}
														 />
				</div>
			);
		}
    return (<div></div>);
		*/
  }
}

export default App;
