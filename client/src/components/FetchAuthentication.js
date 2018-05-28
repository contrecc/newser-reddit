import React, { Component } from 'react'

export default class FetchAuthentication extends Component {
  constructor() {
    super();
    this.getAccessToken = this.getAccessToken.bind(this);
    this.seeLocalStorage = this.seeLocalStorage.bind(this);
  }

  getAccessToken() {
    fetch('/authenticate')
       .then(result => result.json())
       .then(data => {
        sessionStorage.setItem('access_token', data.access_token);
        console.log(data);
       })
    .catch(err => console.log(err));
  }

  seeLocalStorage() {
    let accessToken = sessionStorage.getItem('access_token');
    console.log(accessToken);
  }

  render() {
    return (
      <div>
        <h1>CLICK HERE TO GET AUTHENTICATED</h1>
        <button onClick={this.getAccessToken}>BOOMBABY</button>
        <button onClick={this.seeLocalStorage}>WHAT'S IN LOCAL STORAGE</button>
      </div>
    )
  }
}
