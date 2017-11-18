import React from 'react'
import {Item, Label, Icon, Button} from 'semantic-ui-react'
import './NewsItems.css'
import moment from 'moment'


export default ({items, hover, itemClick, tagClick, watchClick, memberClick}) =>
   <Item.Group divided relaxed={true} className="news">
        {items.map( ({id, src, title, description, tags, startTime, endTime, coords, user, watchers, members}) =>
            <Item key={id}
                         className="newsItem"
                         onMouseEnter={() => {
                             hover(id)
                         }}
                         onMouseLeave={() => hover(id)}
                         onClick={() => itemClick({id})}
            >
                <Item.Image src={src} size="small" label={{
                    color: 'blue',
                    icon: 'time',
                    ribbon: true,
                    content: `${moment(startTime).format("DD.MM HH:mm")}`
                }}/>
                <Item.Content className="content">
                    <Item.Header>
                        <span floated="left">{title}</span>
                    </Item.Header>
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Item.Extra>
                        {tags && tags.map((tag, i) => <Label key={i} as="a" size="small" onClick={() => tagClick({id})}>{tag}</Label>)}
                    </Item.Extra>
                    <Item.Extra>
                        <Label as='a' image>
                            <img src='/favicon.ico'/>
                            {user && user.displayName}
                        </Label>
                        <Button.Group floated="right" size='tiny'>
                            <Button content={watchers.length} icon="eye" onClick={()=>watchClick({id})} circular/>
                            <Button content={members.length} icon="user plus" onClick={()=>memberClick({id})} circular/>


                        </Button.Group>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )}
    </Item.Group>

