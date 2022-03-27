import {Navbar, Container, Column} from 'rbx';
import logImage from '../../assets/images/logo.png'
import '../../styles/header.scss';
import {Link} from 'react-router-dom';

function Header(){
    return(
       <Navbar>
           <Container>
            <Navbar.Brand>
                <Link to="/">
                    <img src={logImage}/>
                </Link>                
                <Navbar.Burger className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </Navbar.Burger>
            </Navbar.Brand>

            <Navbar.Menu>
                <Navbar.Segment  as="div" className="navbar-item navbar-end" align="right">
                 <Column.Group>
                    <Column>
                        <linK to="/register" className="button is-white has-text-custom-purple">Register</linK>
                    </Column>
                    <Column>
                        <linK to="/login" className="button is-outlined is-custom-purple">Login</linK>
                    </Column>
                 </Column.Group>
                </Navbar.Segment>               
            </Navbar.Menu>        
           </Container>
       </Navbar>
    );
}


export default Header;