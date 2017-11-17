import React from 'react'
import {  Item, Label, Icon,Button } from 'semantic-ui-react'
import './NewsItem.css'
import moment from 'moment'


export default ({item:{id,src,title,description,tags,startTime,endTime,coords, user, likes}, hover, itemClick, tagClick,  likeClick})=>
    <Item key={id} onMouseEnter={()=>{hover( id )}} onMouseLeave={()=>hover( id )} onClick={()=>itemClick( { id } )}>

        <Item.Image src={src} size="small" label={{
            color:'blue',
            icon:'time',
            ribbon:true,
            content:`${moment( startTime ).format( "DD.MM HH:mm" )}`
        }}/>
        <Item.Content className="content">
            <Item.Header >
                <span floated="left">{title}</span>
            </Item.Header>
            <Item.Description>
                {description}
            </Item.Description>
            <Item.Extra>
                {tags && tags.map( ( tag, i )=><Label key={i} as="a" size="small" onClick={()=>tagClick( { id } )}>{tag}</Label> )}
            </Item.Extra>
            <Item.Extra>
                <Label as='a' image>
                    <img src='/favicon.ico'/>
                    {user && user.displayName}
                </Label>
                <Button.Group floated="right" size='tiny'>
                    <Button content={likes.length} icon="eye" circular/>
                    <Button.Or />
                    <Button content={likes.length} icon="user plus" circular/>
                </Button.Group>
            </Item.Extra>
        </Item.Content>
    </Item>
