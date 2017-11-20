//@flow
import React, {Component} from 'react'
import {Input, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../../core/actions'
import _ from 'lodash'
import { bindActionCreators } from 'redux'

const options = [
    { key: 'tags', text: 'by tags', value:'tags' },
    { key: 'description', text: 'by description', value:'description' }
]

class Search extends Component {

    filterInput=({target:{value}})=>this.props.actions.filterChanged({value, field:this.props.filter.field});

    filterChange=(event, {value:field})=>this.props.actions.filterChanged({value:"", field});

    render() {
        const { filter: {value, field} } = this.props;
        const opt = options.map(opt=>_.pick(opt,['key', 'text', 'value']))
        return (
            <Input
                action={<Dropdown onChange={this.filterChange} button basic floating options={opt} value={field} />}
                icon='search'
                value={value}
                onChange={this.filterInput}
                iconPosition='left'
                placeholder='filter'
            />
        )
    }
}

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch), } });
const mapProps = ({ui:{filter}}) => ({filter});

export default connect( mapProps, mapActions )( Search )

