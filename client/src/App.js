import React, { Component } from "react";
import NavBar from "./components/NavBar";
import ResultsGrid from "./components/ResultsGrid";
import InfoSection from "./components/InfoSection";
import { Button } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      category: "best",
      count: 0,
      after: ""
    };
    this.handleFetchCategory = this.handleFetchCategory.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
    this.fetchAdditionalPosts = this.fetchAdditionalPosts.bind(this);
  }

  async fetchCategory(category) {
    try {
      const res = await fetch(`/reddit/${category}`);
      const data = await res.json();
      return this.setState({
        data: data.slicedData,
        category: category,
        count: 25,
        after: data.afterValue
      });
    } catch (err) {
      return console.log(err);
    }
  }

  async fetchAdditionalPosts() {
    const { category, count, after } = this.state;

    try {
      const res = await fetch(`/reddit/${category}/${count}/${after}`);
      const data = await res.json();
      return this.setState({
        data: [...this.state.data, ...data.slicedData],
        category: category,
        count: count + 25,
        after: data.afterValue
      });
    } catch (err) {
      return console.log(err);
    }
  }

  handleFetchCategory(e) {
    e.preventDefault();
    let category = e.target.getAttribute("data-value");
    this.fetchCategory(category);
  }

  componentDidMount() {
    this.fetchCategory("best");
  }

  render() {
    const { data, category } = this.state;

    return (
      <div className="App">
        <NavBar handleFetch={this.handleFetchCategory} />
        <div className="container h-100">
          <InfoSection category={category} />
          <ResultsGrid data={data} />
          <Button
            style={{ backgroundColor: "#343a40" }}
            onClick={this.fetchAdditionalPosts}
            className="btn-lg"
          >
            MORE POSTS
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
