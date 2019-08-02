import Button from "react-bootstrap/Button";
import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);
library.add(faMinus);
library.add(faTimes);

export const IconButton = (props)=>{
    return(
        <Button type="button" className="close" onClick={props.onClick}>
            <span aria-hidden="true">
                <FontAwesomeIcon icon={props.icon} size="xs"/>
            </span>
        </Button>)
};
