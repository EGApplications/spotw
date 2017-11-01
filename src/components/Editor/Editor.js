import React, {Component} from 'react'
import { Modal  } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../core/actions'
import EditorForm from '../dumb/EditorForm'

class Editor extends Component{

    submit = (values) => this.props.actions.editorSubmit();

    close = () =>this.props.actions.editorToggle();

    render(){
        const { isOpen, isEventUploading } = this.props;
        return (
            <Modal open={ isOpen } onClose={this.close}>
                <Modal.Header>Создание нового события</Modal.Header>
                <Modal.Content>
                    <EditorForm onSubmit={this.submit} loading={isEventUploading}/>
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