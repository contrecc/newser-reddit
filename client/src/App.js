import React, { Component } from 'react';
// import FetchAuthentication from './components/FetchAuthentication';
// import FetchHot from './components/FetchHot';
// import FetchRising from './components/FetchRising';
// import FetchSearch from './components/FetchSearch';
// import FetchNew from './components/FetchNew';
import NavBar from './components/NavBar';
import { ButtonGroup, Button, Col, Card, CardImg, CardTitle, Row, Navbar, NavbarBrand, NavBarToggler, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleFetchCategory = this.handleFetchCategory.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
  }

  fetchCategory(category) {
    return fetch(`/reddit/${category}`)
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
      .catch(err => console.log(err));
  }

  handleFetchCategory(e) {
    e.preventDefault();
    let category = e.target.getAttribute('data-value');
    // console.log("The category is", category);
    // console.log("The even target is", e.target);

    this.fetchCategory(category);
  }

  // componentDidMount() {
  //   this.fetchCategory('best');
  // }

  render() {
    const { data } = this.state;

    const dataCards = data.map(function(item) {
      return (
        <Col xs="12" sm="6" md="4" lg="3" key={item.permalink}>
          <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <a
              href={item.permalink}
              style={{ color: 'inherit', textDecoration: 'none' }}
              target="_blank"
            >
              <Card style={{ marginBottom: '10px', maxWidth: '240px' }}>
                <CardImg
                  //top
                  //width="100%"
                  style={{ width: '100%' }}
                  src={item.image}
                  alt="Image of New Subreddit Post"
                />
                <CardTitle className="text-overlay">{item.title}</CardTitle>
              </Card>
            </a>
          </div>
        </Col>
      );
    });

    return (
      <div className="App">
      {/* <div className="navbar-div">
        <Navbar expand="md">
          <NavbarBrand href="/" style={{textcolor: "#fff", textDecoration: "none"}}>newser-reddit</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="nav-fill w-100" navbar>
              <NavItem>
                <NavLink data-value="best" onClick={this.handleFetchCategory} >BEST</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="hot" onClick={this.handleFetchCategory} >HOT</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="new" onClick={this.handleFetchCategory} >NEW</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="rising" onClick={this.handleFetchCategory} >RISING</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="controversial" onClick={this.handleFetchCategory}>CONTROVERSIAL</NavLink>
              </NavItem>
              <NavItem>
                <NavLink data-value="top" onClick={this.handleFetchCategory}>TOP</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div> */}
        <NavBar handleFetch={this.handleFetchCategory} />
        {/* <ButtonGroup>
          <Button value="best" onClick={this.handleFetchCategory}>
            BEST
          </Button>
          <Button value="hot" onClick={this.handleFetchCategory}>
            HOT
          </Button>
          <Button value="new" onClick={this.handleFetchCategory}>
            NEW
          </Button>
          <Button value="rising" onClick={this.handleFetchCategory}>
            RISING
          </Button>
          <Button value="controversial" onClick={this.handleFetchCategory}>
            CONTROVERSIAL
          </Button>
          <Button value="top" onClick={this.fetchCategory}>
            TOP
          </Button>
        </ButtonGroup> */}
        <div className="container">
        <Row style={{ paddingTop: '160px' }}>
          {dataCards}
        </Row>
        </div>
        {/* <FetchAuthentication />
        <FetchHot />
        <FetchRising />
        <FetchNew />
        <FetchSearch /> */}
      </div>
    );
  }
}

export default App;
