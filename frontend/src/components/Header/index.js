
import { useState, useEffect } from 'react';
// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// DEPENDENCIES
import { Link } from 'react-router-dom';
// Logo
import hikers_hub_logo from '../../assets/hikers_hub_logo.png';
// STYLE
import './style.css';

export default function Header(props) {

 // state declaration: build JSX array of NavBar items
 const initialState = [
    <div className='nav-item' key='1'>Theme</div>,

    <div className='nav-item' key='2'>
        <Link to='/'>
            <img alt='blogr_logo' src='blogr_logo.png' />
            <h1>logr</h1>
        </Link>
    </div>
]
const [navItems, setNavItems] = useState(initialState)

// add NavBar items to JSX array depending on App login state
useEffect(() => {
    if (props.isLoggedIn) {
        setNavItems(initialState.concat(
            <div className="nav-item" key='3'>
                <button onClick={() => { props.setLogInStatus(false) }}>Log Out</button>
            </div>
        ))
    } else {
        setNavItems(initialState.concat([
            <div className="nav-item" key='3'>
                <Link to='/'>
                    Log In
                </Link>
            </div>
        ]))
    }
}, [props.isLoggedIn])

    return (

        <Navbar className="navbar" variant="light" fixed="top" expand="lg">
            <Container>
                <Link to='/'><Navbar.Brand className="nav-logo"> Logo </Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/addtrail">Add Trail</Nav.Link>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
