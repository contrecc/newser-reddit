require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/reddit/:category', async function(req, res) {
  try {
    const responseData = await fetch(
      `https://www.reddit.com/${req.params.category}/.json?raw_json=1`
    );

    const jsonData = await responseData.json();
    const afterValue = jsonData.data.after;
    const filteredData = jsonData.data.children.filter(function(item) {
      return item.data.preview && item.data.preview.images;
    });

    const mappedData = filteredData.map(function(data) {
      return {
        title:
          data.data.title.length > 50
            ? data.data.title.substring(0, 50) + '...'
            : data.data.title,
        permalink: 'https://www.reddit.com' + data.data.permalink,
        image: data.data.preview
          ? data.data.preview.images[0].source.url
          : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
      };
    });

    const slicedData = mappedData.slice(0, 16);
    res.send({ slicedData, afterValue });
  } catch (error) {
    console.log(`ERROR FETCHING ${req.params.category} STORIES`, error);
  }
});

app.get('/reddit/:category/:count/:after', async function(req, res) {
  try {
    const responseData = await fetch(
      `https://www.reddit.com/${req.params.category}/.json?raw_json=1/?count=${
        req.params.count
      }&after=${req.params.after}`
    );

    const jsonData = await responseData.json();
    const afterValue = jsonData.data.after;
    const filteredData = jsonData.data.children.filter(function(item) {
      return item.data.preview && item.data.preview.images;
    });

    const mappedData = filteredData.map(function(data) {
      return {
        title:
          data.data.title.length > 50
            ? data.data.title.substring(0, 50) + '...'
            : data.data.title,
        permalink: 'https://www.reddit.com' + data.data.permalink,
        image: data.data.preview
          ? data.data.preview.images[0].source.url
          : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
      };
    });

    const slicedData = mappedData.slice(0, 16);
    res.send({ slicedData, afterValue });
  } catch (error) {
    console.log(`ERROR FETCHING MORE ${req.params.category} STORIES`, error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`Server running on PORT ${PORT}`);
});
