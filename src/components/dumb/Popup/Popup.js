import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'


export default (item )=>{
    const {src, trigger, displayTime, title, description} = item;
    console.log(item);

    return(
        <Modal trigger={trigger} dimmer="blurring" closeIcon>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content image>
                <Image src={src} size='medium' alt={title} label={{
                    color: 'blue',
                    icon: 'time',
                    ribbon: true,
                    content: `${displayTime}`
                }}/>
                <Modal.Description>
                    <Header content={title}/>
                    {description}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button primary>
                    Proceed <Icon name='right chevron'/>
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

