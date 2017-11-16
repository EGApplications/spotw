//@flow
import React, {Component} from 'react'
import {Input, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../../core/actions'
import _ from 'lodash'
import { bindActionCreators } from 'redux'

const options = [
    { key: 'tags', text: 'by tags', value:'tags' },
    { key: 'description', text: 'by description', value:'description' },
    { key: 'createdBy', text: 'by users', value:'createdBy'}
]

class Search extends Component {


    state={ filterName:'tags' }

    filterInput=({target})=>this.props.actions.filterChanged({[this.state.filterName]:target.value});

    filterChange=(event, {value:filterName})=>this.setState({filterName})

    render() {
        const { filterName } = this.state;
        const opt = options.map(opt=>_.pick(opt,['key', 'text', 'value']))
        return (
            <Input
                action={<Dropdown onChange={this.filterChange} button basic floating options={opt} value={filterName} />}
                icon='search'
                onChange={this.filterInput}
                iconPosition='left'
                placeholder='Filter'
            />
        )
    }
}



const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });

export default connect( undefined, mapActions )( Search )

