//@flow
import React from 'react'
import {Menu } from 'semantic-ui-react'

export default ( { children } )=>(
    <Menu size="small" fixed="top" fluid={true}>
        {
            children.map(
                ( component, i )=><Menu.Item key={i} content={component} position={i === children.length - 1 ? "right" : "left"}/>
            )
        }
    </Menu>
)

