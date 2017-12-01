import React from 'react'
import { Item, Label, Button } from 'semantic-ui-react'
import './NewsItems.css'
import moment from 'moment'
import twix from 'twix'

export default ( { items, hover, itemClick, tagClick, subscribeClick, memberClick } )=><Item.Group divided relaxed={true} className="news">
    {items.map( ( { id, src, title, description, tags, startTime, endTime, coords, user, subscribers, members } )=>{
           const isDifferentDays = moment( startTime ).day() !== moment( endTime ).day();
            const interval = moment( startTime ).twix( endTime ).format({hideTime: isDifferentDays, hourFormat: "HH"});
            return <Item key={id}
                         className="newsItem"
                         onMouseEnter={ hover.bind( this, id ) }
                         onMouseLeave={ hover.bind( this, id ) }
                         onClick={ itemClick.bind( this, { id } ) }
            >
                <Item.Image src={src} size="small" alt={title} label={{
                    color:'blue',
                    icon:'time',
                    ribbon:true,
                    content:`${interval}`
                }}/>
                <Item.Content className="newsContent">
                    <Item.Header>
                        <span floated="left">{title}</span>
                    </Item.Header>
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Item.Extra>
                        {tags && tags.map( ( tag, i )=>
                            <Label key={i} as="a" size="small" onClick={e=>{e.stopPropagation();tagClick({field:'tags',value:tag})}}>{tag}</Label>
                        )}
                    </Item.Extra>
                    <Item.Extra>
                        <Label as='a' image>
                            <img src='/favicon.ico'/>
                            {user && user.displayName}
                        </Label>
                            <Button.Group floated="right" size='tiny'>
                                <Button content={subscribers.length} icon="eye" onClick={subscribeClick &&subscribeClick.bind(this, { id } )} circular/>
                                <Button content={members.length} icon="user plus" onClick={memberClick &&memberClick.bind(this, { id } )} circular/>
                            </Button.Group>
                    </Item.Extra>
                </Item.Content>
            </Item>
        }
    )}
</Item.Group>

