//@flow
import React, {Component} from 'react'
import {Input, Menu, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import Authorize from '../Authorize'
import User from '../User'
import * as actions from '../../core/actions'
import './Header.css'

const options = [
    { key: 'tags', text: 'by tags', value: 'tags' },
    { key: 'users', text: 'by users', value: 'users' }
]


class Header extends Component{
    state={ filterValue:'tags' }

    filterInput=({target:{value}})=>this.props.filterChanged({[this.state.filterValue]:value});

    filterChange=(event, {value:filterValue})=>this.setState({filterValue})

    render(){
        const {user} = this.props;
        const { filterValue } = this.state;
        return (
            <Menu size="small" className="header-container">
                <Menu.Item>
                    <Input
                        action={<Dropdown onChange={this.filterChange} button basic floating options={options} value={filterValue} />}
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

export default connect( ({request:{user}})=>({user}), {filterChanged:actions.filterChanged} )( Header )
