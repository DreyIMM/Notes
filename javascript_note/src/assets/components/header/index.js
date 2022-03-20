import React from 'React';
import {Navbar, Container} from 'rbx';
import logImage from '../../images/logo.png';

function Header(){
    return(
       <Navbar>
           <Container>
            <Navbar.Brand>
                <img src={logImage}/>
                <Navbar.Burger className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </Navbar.Burger>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Segment  as="div" className="navbar-item navbar-end" align="right">
                 1
                </Navbar.Segment>               
            </Navbar.Menu>
        
           </Container>
       </Navbar>
    );
}


export default Header;