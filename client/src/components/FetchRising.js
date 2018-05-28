import React, { Component } from 'react'

export default class FetchRising extends Component {
  constructor() {
    super();
    this.state = {
      rising: []
    };
    this.fetchRisingStories = this.fetchRisingStories.bind(this);
  }

  fetchRisingStories() {
    fetch("/rising", {
      headers: {
        "Authorization": sessionStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(data => this.setState({rising: data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchRisingStories}>FETCH RISING STORIES</button>
      </div>
    )
  }
}
