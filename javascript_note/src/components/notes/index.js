import React, {useState, Fragment} from "react";
import '../../styles/notes.scss'; 
import {push as Menu} from 'react-burger-menu'
import { Navbar, Container, Column, Button, Dropdown } from 'rbx';

const Notes = (props) =>{
    return (
        <Fragment>
           <Column.Group className="notes" id="notes">
                <Menu
                pageWrapId={"notes-editor"}
                isOpen={props.isOpen}
                onStateChange={(state) => props.setIsOpen(state.isOpen)}
                disableAutoFocus
                outerContainerId={"notes"}
                customBurgerIcon={false}
                customCrossIcon={false}
                >
            <Column.Group>
                <Column size={10} offset={1}>
                 Search...
                </Column>
            </Column.Group>
                <p>List...</p>
        </Menu>


        <Column size={12} className="notes-editor" id="notes-editor">
          Editor...
        </Column>
      </Column.Group>
        </Fragment>
    )
}


export default Notes;