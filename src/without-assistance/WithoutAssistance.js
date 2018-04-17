import React, { Component } from 'react';
import CustomizedPlayer from '../customized-player/CustomizedPlayer';
import EventTimeList from '../event-time-list/EventTimeList';
import Duration from '../duration/Duration'
import './WithoutAssistance.css'

import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron } from 'reactstrap';
import { Container, Row, Col, Button, Badge} from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class WithoutAssistance extends Component {

	constructor(props) {
		super(props);
		this.handleVideoProgress = this._handleVideoProgress.bind(this);
		this.handleVideoDuration = this._handleVideoDuration.bind(this);
		this.handleVideoEnded = this._handleVideoEnded.bind(this);
		this.handleEventTimeDelete = this._handleEventTimeDelete.bind(this);

		this.handleEmergence = this._handleEmergence.bind(this);
		this.handlePlay = this._handlePlay.bind(this);
		this.handleNext = this._handleNext.bind(this);
		this.handlePlayerRef = this._handlePlayerRef.bind(this);
	}

	_handleEmergence() {
    this.props.onWoAssistEmergence();
  }
	_handlePlay() {
    this.props.onWoAssistPlay();
  }
	_handleNext(event) {
    this.props.onWoAssistNext(event);
  }

	_handleVideoProgress(state) {
    this.props.onWoAssistVideoProgress(state);
  }
	_handleVideoDuration(state) {
    this.props.onWoAssistVideoDuration(state);
  }
	_handleVideoEnded () {
    this.props.onWoAssistVideoEnded();
  }
	_handleEventTimeDelete (id) {
    this.props.onWoAssistEventTimeDelete(id);
  }
	_handlePlayerRef(player){
		this.props.onWoAssistRef(player)
	}

  render() {
		const { playing, played, duration, eventTimeList, selectedEvents, events } = this.props;

		let control;
		if(playing)
			control = <Button onClick={this.handleEmergence} color="warning" size="lg" block>Emergence annotate</Button>
	  else if(!playing && played===0)
	  	control = <Button onClick={this.handlePlay} color="danger" size="lg" block>Play</Button>
	  else
			control = <form onSubmit={this.handleNext}><Button color="primary" size="lg" block>Next step</Button></form>

		const showEvents = selectedEvents.map(selectedEvent => {

			let e = events.find( event => event.id === parseInt(selectedEvent, 10));
			//console.log(e)
			return <span key={selectedEvent}><Badge color="info">{e.name}</Badge>{' '}</span>
		})

    return (
			<Container>
				<Row className="py-3">
          <Col>
						<Jumbotron>
							<p><span className="laddning-indices">Step 2</span> In this step, you will need to annotate your selected event(s) when them show on the screen.</p>
							<hr className="my-2" />
							<ol className="without-assistance-ol">
							  <li>Press the <Button size="sm" color="danger" disabled>Play</Button>{' '} button below the video.</li>
							  <li>Once pressing it, the video will start to play and the button will switch to the <Button size="sm" color="warning" disabled>Emergency annotate</Button>{' '} button.</li>
							  <li>Watch the video. If your selected event(s) show on the screen, please press the <Button size="sm" color="warning" disabled>Emergency annotate</Button>{' '} button.</li>
								<li>The annotated event(s) will list below the button. You could delete them by the <Button size="sm" color="danger" disabled outline>Delete</Button> button.</li>
								<li>When the video ends, press the <Button size="sm" color="primary" disabled>Next step</Button>{' '} button to go next step.</li>
								<li className="text-danger">*Once the video played, you can not replay the video so make sure you focus on the video.</li>
							</ol>
						</Jumbotron>
					</Col>
        </Row>
				<Row className="py-3">
          <Col sm="10"><span className="lead">Your selected event(s)</span> {showEvents}</Col>
					<Col className="text-right">elapsed <Duration seconds={played*duration}/> of <Duration seconds={duration}/></Col>
        </Row>
				<Row>
          <Col><CustomizedPlayer playing={playing}
																 onPlayerRef = {this.handlePlayerRef}
																 onVideoDuration={this.handleVideoDuration}
																 onVideoProgress={this.handleVideoProgress}
																 onVideoEnded={this.handleVideoEnded} /></Col>
        </Row>
				<Row className="py-3">
          <Col className="mx-auto" sm={{ size: 6, order: 2, offset: 1 }}>{control}</Col>
        </Row>
				<Form>
					<FormGroup tag="fieldset">
						{events.map((event) =>
							<FormGroup check key={event.id}>
								<Label check>
									<Input type="radio"
												 name={event.name}
												 onChange={this.handleChange}
												 value={event.id} />{' '} {event.name}
								</Label>
							</FormGroup>
						)}
					</FormGroup>
				</Form>
				<Row className="py-3">
          <Col className="mx-auto" sm={{ size: 6, order: 2, offset: 1 }}>
						<EventTimeList eventTimeList={eventTimeList} onEventTimeDelete={this.handleEventTimeDelete} />
					</Col>
        </Row>
			</Container>
    );
  }
}

export default WithoutAssistance;
