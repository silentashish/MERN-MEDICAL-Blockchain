import React,{ Component} from 'react'
import {Nav,Navbar,Link, NavDropdown} from 'react-bootstrap'

class NavbarUpper extends Component{
  render()
    {
      return(
        <Navbar  collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">ElectroHealth</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/privacy Policy">Why Us?</Nav.Link>
            <Nav.Link href="/blog/list">Blog</Nav.Link>
            <Nav.Link href="/career/list">Career</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">
            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeN0I0_8Dm5LCinj9k_jN6mbFZ4PutJPbMFVCmGYGpgCRAx6NiA"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            />
            </Nav.Link>
            <Nav.Link eventKey={2} href="/login">
              Login/Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      )
    }

}
 export default NavbarUpper
