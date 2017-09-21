import React, {Component} from 'react'
import { Modal, Form } from 'semantic-ui-react'
import './Editor.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'

class Editor extends Component{

    state = {title: '', description: '', file: null, startTime:new Date(), endTime:new Date()};

    fileInputChange = ({target: {files:[file]}}) => this.setState({file:file});

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {location} = this.props;
        this.props.actions.editorSubmit({...this.state, location});
    }
    onClose = () =>{
        console.log('close  editor');
        this.props.actions.editorToggle();
    }

    render(){
        const { title, description, startTime, endTime } = this.state;
        const { isOpen, isEventUploading } = this.props;
        return (
            <Modal open={ isOpen } onClose={this.onClose}>
                <Modal.Header>Создание нового события</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit} loading={isEventUploading}>
                        <Form.Input label='Title' placeholder='Event name' name="title" value={title} onChange={this.handleChange} required/>
                        <Form.TextArea label='Description' name="description" value={description} onChange={this.handleChange} placeholder='Tell us more about you...' required/>
                        <Form.Input label='Start' placeholder='Event name' type="datetime-local" name="startTime" value={startTime} onChange={this.handleChange} required/>
                        <Form.Input label='End' placeholder='Event name' type="datetime-local" name="endTime" value={endTime} onChange={this.handleChange} required/>
                        <Form.Input type="file" onChange={this.fileInputChange} required/>
                        <Form.Button content='Submit' label="Create"/>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}


const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

const mapProps = ({ui:{editorOpen}, map:{lastClick:{latlng}}, request:{saveEventPending}}) => ({
    isOpen:editorOpen,
    location:latlng,
    isEventUploading:saveEventPending
});

export default connect( mapProps, mapActions )( Editor )