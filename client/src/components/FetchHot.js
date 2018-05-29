import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Col, Row } from 'reactstrap';

export default class FetchHot extends Component {
  constructor() {
    super();
    this.state = {
      newData: []
    };
    this.fetchHotStories = this.fetchHotStories.bind(this);
  }

  fetchHotStories() {
    fetch('/reddit/hot')
      .then(res => res.json())
      .then(data => this.setState({ newData: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { newData } = this.state;

    const newDataCards = newData.map(function(item) {
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
      <div>
        <button onClick={this.fetchHotStories}>FETCH HOT STORIES</button>
        <Row style={{ paddingLeft: '10px', paddingRight: '10px' }}>
          {newDataCards}
        </Row>
      </div>
    );
  }
}

