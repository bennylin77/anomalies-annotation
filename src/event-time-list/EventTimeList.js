import React, { Component } from 'react';
import Duration from '../duration/Duration'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


class EventTimeList extends Component {

	constructor(props) {
		super(props);
		this.handleDelete = this._handleDelete.bind(this);
	}
	_handleDelete(id) {
    this.props.onEventTimeDelete(id);
  }


  render() {
		const { events, eventTimeList, duration } = this.props;
		const items = 	eventTimeList.map((event) =>{
										let e = events.find( e => e.id === parseFloat(event.selectedEvent, 10));
										return(	<ListGroupItem key={event.id} className="h-100">
															<img src={event.frame} className="rounded" alt="" height="38"/>
															<span style={{"padding-top":"15px"}}> {e.name} at <Duration seconds={event.startTime*duration}/> - <Duration seconds={event.endTime*duration}/></span>
															<Button outline color="danger" className="float-right" onClick={()=>this.handleDelete(event.id)}>Delete</Button>
														</ListGroupItem>)
										})
    return (
						<ListGroup>{items}</ListGroup>
    );
  }
}

export default EventTimeList;
