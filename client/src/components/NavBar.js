import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

export default class NavBar extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.toggle = this.toggle.bind(this);
  //   this.state = {
  //     isOpen: false
  //   };
  // }
  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className="navbar-div">
        <Navbar expand="md">
          <NavbarBrand href="/" style={{textcolor: "#fff", textDecoration: "none"}}>newser for reddit</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="light-icons">
            <div className="icons" />
            <div className="icons" />
            <div className="icons" />
            </NavbarToggler>
          <Collapse isOpen={this.state.collapsed} navbar>
            <Nav className="nav-fill w-100" navbar>
              <NavItem>
                <NavLink data-value="best" onClick={this.props.handleFetch}>BEST</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="hot" onClick={this.props.handleFetch} >HOT</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="new" onClick={this.props.handleFetch} >NEW</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="rising" onClick={this.props.handleFetch} >RISING</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="controversial" onClick={this.props.handleFetch}>CONTROVERSIAL</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="top" onClick={this.props.handleFetch}>TOP</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}