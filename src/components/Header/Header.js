//@flow
import React, {Component} from 'react'
import {Input, Menu, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import Authorize from '../Authorize'
import _ from 'lodash'
import User from '../User'
import * as actions from '../../core/actions'
import './Header.css'

const options = [
    { key: 'tags', text: 'by tags', value:'tags', additionalData:{method:"equalTo"} },
    { key: 'description', text: 'by description', value:'description', additionalData:{method:"contains"} },
    { key: 'createdBy', text: 'by users', value:'createdBy', additionalData:{method:"equalTo"} }
]

class Header extends Component{
    state={ filterValue:'tags' }

    filterInput=({target:{value}})=>{
        const name = this.state.filterValue;
        const {additionalData} = options.find(item=>name===item.value);
        this.props.filterChanged({[name]:{value, ...additionalData}});
    }

    filterChange=(event, {value:filterValue})=>this.setState({filterValue})

    render(){
        const {user} = this.props;
        const { filterValue } = this.state;
        const opt = options.map(opt=>_.pick(opt,['key', 'text', 'value']))
        return (
            <Menu size="small" className="header-container">
                <Menu.Item>
                    <Input
                        action={<Dropdown onChange={this.filterChange} button basic floating options={opt} value={filterValue} />}
                        icon='search'
                        onChange={this.filterInput}
                        iconPosition='left'
                        placeholder='Filter'
                    />
                </Menu.Item>

                <Menu.Item position="right">
                    {user ? <User username={user.username}/> : <Authorize/>}
                </Menu.Item>
            </Menu>
        )
    }
}

export default connect( ({auth:{user}})=>({user}), {filterChanged:actions.filterChanged} )( Header )
