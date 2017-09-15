import React, {Component} from 'react'
import { Button, Header,  Modal, Form } from 'semantic-ui-react'
import FileInput from 'react-file-input';


const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
]

class MarkerEditor extends Component{
    state = {};

    handleChange = ( e, { value } )=>this.setState( { value } );

    fileInputChange = event=>{
        console.log('Selected file:', event.target.files[0])
    }

    render(){
        const { value } = this.state
        return (
            <Modal open={true}>
                <Modal.Header>Marker Editor</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label='Title' placeholder='Event name'/>
                        <Form.TextArea label='Description' placeholder='Tell us more about you...'/>
                        <FileInput name="Main Image"
                                   accept=".png,.gif"
                                   placeholder="Main Image"
                                   className="inputClass"
                                   onChange={this.fileInputChange} />
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default MarkerEditor