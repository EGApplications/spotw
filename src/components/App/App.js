//@flow
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import './App.css';
import * as actions from '../../core/actions'
import Map from '../MapWrap'
import Header from '../Header'
import News from '../News'
import Footbar from '../Footbar'
import Editor from '../Editor'

class App extends Component {

    componentDidMount(){
        this.props.actions.initApp();
    }

    render(){
        const { user } = this.props;
        return(
            <div className="App">
                <Map/>
                <News/>
                <Header/>
                { !!user && <Footbar/> }
                <Editor/>
            </div>
        )
    }
}


const mapAction = (dispatch)=>( { actions: {...bindActionCreators (actions, dispatch) } } );
const mapProps = ({request:{user}})=>( { user } );
export default connect( mapProps, mapAction )( App )
