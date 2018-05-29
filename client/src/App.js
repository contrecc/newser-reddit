import React, { Component } from 'react';
// import FetchAuthentication from './components/FetchAuthentication';
// import FetchHot from './components/FetchHot';
// import FetchRising from './components/FetchRising';
// import FetchSearch from './components/FetchSearch';
// import FetchNew from './components/FetchNew';
import NavBar from './components/NavBar';
import { ButtonGroup, Button, Col, Card, CardImg, CardTitle } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.handlefetchCategory = this.handlefetchCategory.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);   
  }

  fetchCategory(category) {
    return fetch(`/reddit/${category}`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(err => console.log(err));
  }

  handlefetchCategory(e) {
    e.preventDefault();
    let category = e.target.value;

    this.fetchCategory(category);
  }

  componentDidMount() {
    this.fetchCategory("best");
  }

  render() {
    const { data } = this.state;

    const dataCards = data.map(function(item) {
      return (
        <Col key={item.permalink}>
          <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <a
              href={item.permalink}
              style={{ color: 'inherit', textDecoration: 'none' }}
              target="_blank"
            >
              <Card style={{ marginBottom: '10px', width: '320.5px' }}>
                <CardImg
                  //top
                  //width="100%"
                  style={{ maxWidth: '100%', overflow: 'hidden' }}
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
        <NavBar />
        <ButtonGroup>
          <Button value="best" onClick={this.handlefetchCategory}>BEST</Button>
          <Button value="hot" onClick={this.handlefetchCategory}>HOT</Button>
          <Button value="new" onClick={this.handlefetchCategory}>NEW</Button>
          <Button value="rising" onClick={this.handlefetchCategory}>RISING</Button>
          <Button value="controversial" onClick={this.handlefetchCategory}>CONTROVERSIAL</Button>
          <Button value="top" onClick={this.fetchCategory}>TOP</Button>
        </ButtonGroup>
        {dataCards}
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
