//@flow
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import './App.css';
import * as actions from '../../core/actions/actions'

class App extends Component {
    render = () => (
        <div className="App">
            <div className="App-header">
                <h2>Welcome to React</h2>
            </div>
            <p className="App-intro" onClick={() => {
                console.log('click');
                this.props.actions.action();
            }}>
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
    return {
        actions:{
            ...bindActionCreators(actions, dispatch),
        }
    }
}
export default connect( state=>state, mapDispatchToProps )( App )
