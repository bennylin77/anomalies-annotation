import React, { Component } from 'react';
import CustomizedPlayer from '../customized-player/CustomizedPlayer';
import EventTimeList from '../event-time-list/EventTimeList';
import Duration from '../duration/Duration'
import './Task.css'
import './Range.css'

import Measure from 'react-measure'

import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Form, FormGroup, Input,
				 Card, CardBody } from 'reactstrap';




class Task extends Component {

		constructor(props) {
			super(props);


			this.state = {
		    dimensions: {
		      width: -1,
		      height: -1
		    }
		  }


			this.handlePlayerRef = this._handlePlayerRef.bind(this);
			this.handleVideoDuration = this._handleVideoDuration.bind(this);
			this.handleVideoProgress = this._handleVideoProgress.bind(this);
			this.handleVideoEnded = this._handleVideoEnded.bind(this);

			this.handleEventTimeDelete = this._handleEventTimeDelete.bind(this);
			this.handleEventTimeAdd = this._handleEventTimeAdd.bind(this);
			this.handleEventTimeInputChange = this._handleEventTimeInputChange.bind(this);
		}

		_handlePlayerRef(player){
			this.props.onTaskPlayerRef(player)
		}
		_handleVideoDuration(state) {
	    this.props.onTaskVideoDuration(state);
	  }
		_handleVideoProgress(state) {
	    this.props.onTaskVideoProgress(state);
	  }
		_handleVideoEnded () {
	    this.props.onTaskVideoEnded();
	  }
		_handleEventTimeDelete (id) {
	    this.props.onTaskEventTimeDelete(id);
	  }
		_handleEventTimeAdd(){
			this.props.onTaskEventTimeAdd();
		}
		_handleEventTimeInputChange(e){
			this.props.onTaskEventTimeInputChange(e);
		}
		handleVideoSeekMouseDown = e => {
			this.props.onTaskVideoSeekMouseDown(e);
	  }
	  handleVideoSeekChange = e => {
	    this.props.onTaskVideoSeekChange(e);
	  }
	  handleVideoSeekMouseUp = e => {
			this.props.onTaskVideoSeekMouseUp(e);
	  }
		handleVideoSetTimeMouseDown = e => {
			this.props.onTaskVideoSetTimeMouseDown(e);
	  }
		handleVideoSetTimeChange = e => {
			this.props.onTaskVideoSetTimeChange(e);
	  }
		handleVideoSetTimeMouseUp = e => {
			this.props.onTaskVideoSetTimeMouseUp(e);
	  }
		handleVideoPlayPause = () => {
			this.props.onTaskVideoPlayPause();
		}


	  render() {
			const { playing, played, duration, eventTimeList, events,
							selectedStart, selectedEnd, selectedEvent,
							indicator1, indicator2} = this.props;
			const eventOptions = events.map((e) => {
				if(parseFloat(selectedEvent) === e.id)
					return (<option selected key={e.id} value={e.id}>{e.name}</option>)
				else
					return (<option key={e.id} value={e.id}>{e.name}</option>)
			});
			const { width } = this.state.dimensions
			const selectedRangeStyle = {
					left: width*selectedStart,
					width: (selectedEnd-selectedStart)*width
			    /*width:  this.calcWidth()  + 'px',*/
			};
			const startToolTipStyle={
					left: width*selectedStart-60
			}
			const endToolTipStyle={
					left: width*selectedEnd+30
			}

	    return (
				<Container>
					<Row className="pt-3">
	          <Col>
							<CustomizedPlayer playing={playing}
																onPlayerRef = {this.handlePlayerRef}
																onVideoDuration={this.handleVideoDuration}
																onVideoProgress={this.handleVideoProgress}
																onVideoEnded={this.handleVideoEnded} />
						</Col>
	        </Row>
					<Row className="py-1">
						<Col><Button outline color="danger" onClick={this.handleVideoPlayPause}>{playing ? 'Pause video' : 'Play video'}</Button></Col>
						<Col><div className="text-right text-muted"><Duration seconds={played*duration}/> / <Duration seconds={duration}/></div></Col>
					</Row>
					<Card>
				  	<CardBody>
									<div>Select event time range</div>
									<div> <b>start at: <Duration seconds={selectedStart*duration}/></b> <b>end at: <Duration seconds={selectedEnd*duration}/></b></div>
									<section className="range-slider">
											<input
											 value={indicator1}
											 name="indicator1"
											 type='range' min={0} max={1} step='any'
											 onMouseDown={this.handleVideoSetTimeMouseDown}
											 onChange={this.handleVideoSetTimeChange}
											 onMouseUp={this.handleVideoSetTimeMouseUp}
											/>
											<input
											 value={indicator2}
											 name="indicator2"
											 type='range' min={0} max={1} step='any'
											 onMouseDown={this.handleVideoSetTimeMouseDown}
											 onChange={this.handleVideoSetTimeChange}
											 onMouseUp={this.handleVideoSetTimeMouseUp}
											/>
										<Measure
								    	bounds
								      onResize={(contentRect) => {
								          this.setState({ dimensions: contentRect.bounds })
								      }}>
								      {({ measureRef }) =><div ref={measureRef}></div>}
								    </Measure>
									</section>
									<section className="player-slider">
										<input
											type='range' min={0} max={1} step='any'
											value={played}
											onMouseDown={this.handleVideoSeekMouseDown}
											onChange={this.handleVideoSeekChange}
											onMouseUp={this.handleVideoSeekMouseUp}
										 />
									 <div className="selected-range" style={selectedRangeStyle}></div>
									</section>
									<Form>
										<FormGroup row>
												<Col sm={12}>
												<Input type="select" name="selectedEvent" onChange={this.handleEventTimeInputChange}>{eventOptions}</Input>
												</Col>
										</FormGroup>
											{' '}
									</Form>
									<Button onClick={this.handleEventTimeAdd} color="warning" size="md">Add event</Button>
				    </CardBody>
				  </Card>
					<Row className="py-3">
	          <Col className="mx-auto" sm={{ size: 12, offset: 0 }}>
							<EventTimeList duration={duration} eventTimeList={eventTimeList} onEventTimeDelete={this.handleEventTimeDelete} events={events} />
						</Col>
	        </Row>
					<Row className="py-3">
	          <Col className="mx-auto" sm={{ size: 12, offset: 0 }}>
							<Button color="primary" size="lg" block>Submit hit</Button>
						</Col>
	        </Row>
				</Container>
	    );
	  }
}
export default Task;
/*
	<div className="startToolTip rangeToolTip" style={startToolTipStyle}><Duration seconds={selectedStart*duration}/></div>
	<div className="endToolTip rangeToolTip" style={endToolTipStyle}><Duration seconds={selectedEnd*duration}/></div>*/
