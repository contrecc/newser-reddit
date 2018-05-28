require('dotenv').config();

const express = require('express');
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';
const APP_ONLY_GRANT_TYPE = 'client_credentials';
const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

let token = '';

const fetchRedditCategoryData = function(category, accessToken) {
  return fetch(`https://oauth.reddit.com/r/${category}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.log('ERROR IN fetchRedditCategoryData function', error);
    });
};

app.get('/authenticate', async function(req, response) {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', APP_ONLY_GRANT_TYPE);
    params.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');

    // Get access token
    const tokenData = await fetch(REDDIT_ACCESS_TOKEN_URL, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`
        ).toString('base64')}`
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err));

    //token = tokenData.access_token;
    token = tokenData.access_token;
    console.log(tokenData);
    response.send(tokenData);
    //res.json({ accessToken: token });
    //console.log(tokenData);
  } catch (error) {
    console.log('Error fetching access token', error);
  }
  //return res.json({'accessToken': token});
  //res.send('Hello');
  //res.json({ accessToken: token });
});

app.get('/hot', async function(req, res) {
  // if(req.headers.authorization === token) {
  // console.log(req.headers.authorization);
  // console.log("the token is", token);
  //}

  try {
    const responseData = await fetchRedditCategoryData(
      'subreddit/hot',
      req.headers.authorization
    );
    const jsonData = await responseData.data.children;
    //console.log("The JSON data is", jsonData[2]);
    //console.log("The title is", jsonData[2].data.title);
    //console.log("The permalink is", jsonData[2].permalink);

    const mappedItems = await jsonData.map(function(data) {
      return (
        'https://www.reddit.com' + data.data.permalink + '.json?raw_json=1'
      );
    });

    // const individualLinkData = await Promise.all(mappedItems.map(fetch).then(response => response.json()));
    // //const individualJsonData = await individualLinkData.json();
    // console.log("HERE IS THE INIDIVIDUALLY FETCHED DATA", individualLinkData);

    var requestAsync = function(url) {
      return new Promise((resolve, reject) => {
        var req = request(url, (err, response, body) => {
          if (err) return reject(err, response, body);
          resolve(JSON.parse(body));
        });
      });
    };

    var getParallel = async function(urls) {
      //transform requests into Promises, await all
      try {
        var data = await Promise.all(urls.map(requestAsync));
        var filtered = data.map(function(item) {
          return item.data[0];
        });
      } catch (err) {
        console.error(err);
      }
      console.log(json);
    };

    getParallel(mappedItems);

    // const individualPostsData = await fetch

    //console.log(mappedItems);

    res.send(mappedItems);

    //console.log("The response data is", mappedItems);
    // thumbnail: data.data.secure_media ? data.data.secure_media.oembed.thumbnail_url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
  } catch (error) {
    console.log('ERROR FETCHING HOT STORIES', error);
  }
});

app.get('/rising', async function(req, res) {
  // if(req.headers.authorization === token) {
  // console.log(req.headers.authorization);
  // console.log("the token is", token);
  //}

  try {
    const responseData = await fetchRedditCategoryData(
      'rising',
      req.headers.authorization
    );
    const jsonData = await responseData.data.children;
    //console.log("The JSON data is", jsonData[2]);
    //console.log("The title is", jsonData[2].data.title);
    //console.log("The permalink is", jsonData[2].permalink);
    // const filteredItems = await jsonData.filter(function(item) {
    //   return Object.keys(item).includes("data.secure_media");
    // });
    const mappedItems = await jsonData.map(function(data) {
      return {
        title: data.data.title,
        permalink: 'https://www.reddit.com' + data.data.permalink,
        thumbnail: data.data.secure_media
          ? data.data.secure_media.oembed.thumbnail_url
          : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
      };
    });

    res.send(mappedItems);

    //console.log("The response data is", mappedItems);
    // thumbnail: data.data.secure_media ? data.data.secure_media.oembed.thumbnail_url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
  } catch (error) {
    console.log('ERROR FETCHING HOT STORIES', error);
  }
});

app.get('/new', async function(req, res) {
  // if(req.headers.authorization === token) {
  // console.log(req.headers.authorization);
  // console.log("the token is", token);
  //}

  try {
    const responseData = await fetch(
      'https://www.reddit.com/hot/.json?raw_json=1'
    );

    const jsonData = await responseData.json();

    const filteredData = jsonData.data.children.filter(function(item) {
      return item.data.preview !== undefined;
    });

    const mappedData = filteredData.map(function(data) {
      return {
        title: data.data.title.length > 50 ? data.data.title.substring(0, 50) + '...' : data.data.title,
        permalink: 'https://www.reddit.com' + data.data.permalink,        
        image: data.data.preview ? data.data.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
        
        // .images[0].source.url ? data.data.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
      };
    });

    res.send(mappedData);
  } catch (error) {
    console.log('ERROR FETCHING HOT STORIES', error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`Server running on PORT ${PORT}`);
});
