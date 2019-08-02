import React from 'react';
import {Badge, ListGroup } from "react-bootstrap";
import {isEmpty} from "lodash";
import {IconButton} from "../IconButton/IconButton";

export const ContentList = (props)=>{
    return (
        <>
            { props.title && <h3>{props.title}</h3> }
            <ListGroup className={props.className}>
                {isEmpty(props.data)?
                    <p> {props.name} is empty</p>:
                    props.data.map((item,i) =>
                        <ListGroup.Item key={i}>
                            {`${i+1}) `}{typeof item === 'string' ? item : item.name}
                            <span className="float-right">
                                {typeof item.count === "number" && <Badge variant="primary" className="mr-lg-4">{item.count}</Badge>}
                                <IconButton itemKey={i}
                                            icon={props.icon}
                                            onClick={()=>props.onClick(item, i)}/>
                            </span>
                        </ListGroup.Item>)}
            </ListGroup>
        </>
    )
};
