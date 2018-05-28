import React, { Component } from 'react'

export default class FetchSearch extends Component {
  constructor() {
    super();
    this.fetchSearch = this.fetchSearch.bind(this);
  }

  fetchSearch() {
    return fetch('http://www.reddit.com/search.json?q=burgers&limit=10')
      .then(res => res.json())
      .then(data => data.data.children.map(data => data.data))
      .then(results => console.log(results))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchSearch}>FETCH SEARCH</button>
      </div>
    )
  }
}