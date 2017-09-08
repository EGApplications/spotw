//@flow
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import './App.css';
import * as actions from '../../core/actions'
import Map from '../Map'
import Header from '../Header'
import News from '../News'

class App extends Component {

    componentDidMount(){
        this.props.actions.initApp();
    }

    render = () => (
        <div className="App">
            <Map/>
            <News/>
            <Header/>
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
