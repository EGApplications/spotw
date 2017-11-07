import React, {Component} from 'react'
import { List, Image } from 'semantic-ui-react'
import * as actions from '../../core/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class FriendsList extends Component {

    componentDidMount(){
        this.props.actions.getFriends();
    }

    render() {
        const {userFriends} = this.props;
        return (
            <List>
                {userFriends.map(({photo_200, first_name, last_name, online, uid},i)=>(
                    <List.Item key={i}>
                        <Image avatar src={photo_200} />
                        <List.Content>
                            <List.Header as='a' src={`https://vk.com/${uid}`}>{`${first_name} ${last_name}`}</List.Header>
                            <List.Description><a><b>online: {online}</b></a></List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        )
    }
}

const mapState = ( ({request:{userFriends}})=>({userFriends}) );

const mapActions = dispatch => ({ actions:{ ...bindActionCreators(actions, dispatch) } });

export default connect(mapState, mapActions)(FriendsList)