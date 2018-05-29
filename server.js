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

//const REDDIT_ACCESS_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';
//const APP_ONLY_GRANT_TYPE = 'client_credentials';
//const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
//const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

//let token = '';

// const fetchRedditCategoryData = function(category) {
//   return fetch(`https://www.reddit.com/${category}/.json?raw_json=1`)
//     .then(function(response) {
//       return response.json();
//     })
//     .catch(function(error) {
//       console.log('ERROR IN fetchRedditCategoryData FUNCTION', error);
//     });
// };

app.get('/reddit/:category', async function(req, res) {
  try {
    // console.log("CATEGORY CATEGORY CATEGORY CATEGORY", req.params.category);
    // console.log("===================================");
    // console.log("===================================");
    // console.log("===================================");

    const responseData = await fetch(
      `https://www.reddit.com/${req.params.category}/.json?raw_json=1`
    );

    const jsonData = await responseData.json();

    const filteredData = jsonData.data.children.filter(function(item) {
      return item.data.preview && item.data.preview.images;
    });

    const mappedData = filteredData.map(function(data) {
      return {
        title: data.data.title.length > 50 ? data.data.title.substring(0, 50) + '...' : data.data.title,
        permalink: 'https://www.reddit.com' + data.data.permalink,        
        image: data.data.preview ? data.data.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
      };
    });

    const slicedData = mappedData.slice(0, 16);

    // console.log("The mapped over data is ", mappedData);

    res.send(slicedData);
  } catch (error) {
    console.log(`ERROR FETCHING ${req.params.category} STORIES`, error);
  }
});

// app.get('/rising', async function(req, res) {
//   // if(req.headers.authorization === token) {
//   // console.log(req.headers.authorization);
//   // console.log("the token is", token);
//   //}

//   try {
//     const responseData = await fetchRedditCategoryData(
//       'rising',
//       req.headers.authorization
//     );
//     const jsonData = await responseData.data.children;
//     //console.log("The JSON data is", jsonData[2]);
//     //console.log("The title is", jsonData[2].data.title);
//     //console.log("The permalink is", jsonData[2].permalink);
//     // const filteredItems = await jsonData.filter(function(item) {
//     //   return Object.keys(item).includes("data.secure_media");
//     // });
//     const mappedItems = await jsonData.map(function(data) {
//       return {
//         title: data.data.title,
//         permalink: 'https://www.reddit.com' + data.data.permalink,
//         thumbnail: data.data.secure_media
//           ? data.data.secure_media.oembed.thumbnail_url
//           : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
//       };
//     });

//     res.send(mappedItems);

//     //console.log("The response data is", mappedItems);
//     // thumbnail: data.data.secure_media ? data.data.secure_media.oembed.thumbnail_url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
//   } catch (error) {
//     console.log('ERROR FETCHING HOT STORIES', error);
//   }
// });

// app.get('/new', async function(req, res) {
//   // if(req.headers.authorization === token) {
//   // console.log(req.headers.authorization);
//   // console.log("the token is", token);
//   //}

//   //let category = req.body;
//   console.log("REQ.BODY.CATEGORY SENT FROM THE FETCH_NEW COMPONENT", req.body);

//   try {
//     const responseData = await fetch(
//       'https://www.reddit.com/hot/.json?raw_json=1'
//     );

//     const jsonData = await responseData.json();

//     const filteredData = jsonData.data.children.filter(function(item) {
//       return item.data.preview !== undefined;
//     });

//     const mappedData = filteredData.map(function(data) {
//       return {
//         title: data.data.title.length > 50 ? data.data.title.substring(0, 50) + '...' : data.data.title,
//         permalink: 'https://www.reddit.com' + data.data.permalink,        
//         image: data.data.preview ? data.data.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
        
//         // .images[0].source.url ? data.data.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
//       };
//     });

//     res.send(mappedData);
//   } catch (error) {
//     console.log('ERROR FETCHING HOT STORIES', error);
//   }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`Server running on PORT ${PORT}`);
});
