import React, {Component} from 'react'
import { Modal, Form } from 'semantic-ui-react'
import './MarkerEditor.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'

class MarkerEditor extends Component{

    state={title:'',description:''}

    fileInputChange = console.log;

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => this.props.actions.editorSubmit(this.state);

    render(){
        const {title,description} = this.state;
        const {isOpen} = this.props;
        return (
            <Modal open={isOpen}>
                <Modal.Header>Marker Editor</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input label='Title' placeholder='Event name' name="title" value={title} onChange={this.handleChange} required/>
                        <Form.TextArea label='Description' name="description" value={description} onChange={this.handleChange} placeholder='Tell us more about you...'/>
                        <Form.Input type="file" onChange={this.fileInputChange}/>
                        <Form.Button content='Submit' label="Create"/>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}


const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });
const mapProps = state => ({isOpen:false});

export default connect( mapProps, mapActions )( MarkerEditor )