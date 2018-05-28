import React, { Component } from 'react'

export default class FetchHot extends Component {
  constructor() {
    super();
    this.state = {
      hot: []
    };
    this.fetchHotStories = this.fetchHotStories.bind(this);
  }

  fetchHotStories() {
    fetch("/hot", {
      headers: {
        "Authorization": sessionStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(data => this.setState({hot: data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchHotStories}>FETCH HOT STORIES</button>
      </div>
    )
  }
}
