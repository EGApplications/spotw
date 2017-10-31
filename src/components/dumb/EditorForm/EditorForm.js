import React, {Component} from 'react'
import { Form, Message } from 'semantic-ui-react'
import { Field, Fields, reduxForm } from 'redux-form'

class Editor extends Component{
    render(){
        const { loading, onSubmit, valid, pristine  } = this.props;
        return (
                    <Form onSubmit={onSubmit} loading={loading}>
                        <Form.Field><Field name="title" component="input" placeholder='Title' type="text"  /></Form.Field>
                        <Form.Field><Field name="description" component="textarea" placeholder='Description' /></Form.Field>
                        <Form.Field><Field name="startTime" component="input"  type="datetime-local" /></Form.Field>
                        <Form.Field><Field name="endTime" component="input"  type="datetime-local" /></Form.Field>
                        <Field
                            component={FileInput}
                            name="image"
                        />
                        <Form.Button content='Create' disabled={!valid}/>
                        <Message color="red" content="Requried"/>
                    </Form>

        )
    }
}

const validate = (values, {registeredFields={}, anyTouched}) => {
    const errors = {}
    Object.keys(registeredFields).forEach(key=>{
        if ( !values[key] ) errors[key] = `${key} required`
    })
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.title && values.title.length < 19) {
        warnings.title = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0])

const FileInput = ({
                       input: {
                           value: omitValue,
                           onChange,
                           onBlur,
                           ...inputProps,
                       },
                       meta: omitMeta,
                       ...props,
                   }) =>
    <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...inputProps}
        {...props}
    />


export default reduxForm({ form: 'editor', validate, warn })(Editor)