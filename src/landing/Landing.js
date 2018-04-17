import React, { Component } from 'react';
import './Landing.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Landing extends Component {

	constructor(props) {
		super(props);
		this.state = { cSelected: [] };
		this.handleChange = this._handleChange.bind(this);
		this.handleNext = this._handleNext.bind(this);

	}
	_handleChange(event) {
		this.props.onEventSelect(event);
  }
	_handleNext(){
		this.props.onLandingNext();
	}


  render() {
		const events = this.props.events
    return (
			<Container>
				<Row className="py-3">
					<Col>
						<Jumbotron>
							<h1 className="display-5">Instructions</h1>
							Imagine you are a school security guard, your task is to monitor the video surveillance and find the emergent event show on the screen.
							However, in fact, people has different definitions of <b>emergent events</b>. For example, if your schools do not allow biking in the campus so if you notice someone biking on the campus you must respond to it, but for other schools, you might not need to take an action
							The following step-by-step instructions will guide you through the work of being a security guard.
			        <hr className="my-2" />
			        <p><span className="laddning-indices">Step 1</span> Please select event(s) which you think it is <b>emergent</b> for the campus you imagined.</p>
							<Form>
								<FormGroup tag="fieldset">
									{events.map((event) =>
										<FormGroup check key={event.id}>
											<Label check>
					              <Input type="checkbox"
															 name={event.name}
															 onChange={this.handleChange}
															 value={event.id} />{' '} {event.name}
					            </Label>
										</FormGroup>
									)}
				        </FormGroup>
							</Form>
							<p>After selecting, please press <b>Next step</b></p>
							<p className="lead">
								<Button color="primary" size="lg" onClick={this.handleNext}>Next step</Button>
							</p>
			      </Jumbotron>
					</Col>
				</Row>
      </Container>
    );
  }
}

export default Landing;
