# NEWSER FOR REDDIT

This is a personal project I built to clone Newser. I wanted to use Reddit categories for the posts, but format them like Newser.

# Original Goal

I wanted to authenticate with OAuth 2.0 like the Reddit API requires for commercial apps. I built the functionality to do this, but realized for the use case of my app, I didn't need OAuth 2.0. I wasn't having users log in or access their own posts. This was simply pulling data from Reddit and displaying it in Newser cards.

It seemed silly to have users click a button to authenticate without accessing their own data. 

# Revised Goal

Have the app load with Reddit's first page of "best" posts. Then in the header, give the user the ability to change categories to the main ones on Reddit. Also have a button like on Newser that loads more stories.

# Lessons Learned

1) Dealing with authentication can be difficult, so if you are going to go down that road, make sure you are taking advantage of what going through that process provides your users.

2) Reddit's API was not particularly user-friendly. My app originally was going to authenticate with the "client credentials" type, but it was difficult to set that up. Google and Stack Overflow helped me solve this problem.

3) Being able to view Reddit with cards is much nicer than their standard numbered list!
