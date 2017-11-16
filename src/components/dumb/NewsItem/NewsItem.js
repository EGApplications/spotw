import React from 'react'
import {  Item, Label, Icon, } from 'semantic-ui-react'
import './NewsItem.css'
import moment from 'moment'


export default ({item:{id,src,title,description,tags,startTime,endTime,coords, user, likes}, hover, itemClick, tagClick,  likeClick})=>
    <Item key={id} onMouseEnter={()=>{hover(id)}}  onMouseLeave={()=>hover(id)} onClick={()=>itemClick({id})}>
        <Item.Image  src={src} />
        <Item.Content className="content">
            <Item.Header>
                <span>{title}</span>
            </Item.Header>
            <Item.Meta>
                <span className='cinema'>{`${moment(startTime).format("DD.MM HH:mm")}`}</span>
            </Item.Meta>
            <Item.Description>
                {description}
            </Item.Description>
            <Item.Extra>
                {tags && tags.map((tag,i)=><Label key={i} as="a" size="small" onClick={()=>tagClick({id})}>{tag}</Label>)}
            </Item.Extra>
            <Item.Extra  >
                <div className="like" >
                    <Label as='a' image>
                        <img src='/favicon.ico'/>
                        {user && user.displayName}
                    </Label>
                    <Label
                        onClick={ ()=>{likeClick({id})} }
                        as='a'
                        content={likes.length}
                        floated='right'
                        icon={<Icon name="heart" color="red"/>}
                    />
                </div>
            </Item.Extra>
        </Item.Content>
    </Item>
