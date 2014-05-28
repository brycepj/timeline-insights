# Timeline Insights

## Synopsis

This project provides JavaScript methods for extracting insights and datasets from the Twitter API's user_timeline data on the client.

## Getting the user_timeline data

Unfortunately, Twitter recently made it much more difficult to get user_timeline data than it used to be. If you haven't implemented a 3-legged authorization before, start [here](https://dev.twitter.com/docs/auth/3-legged-authorization). 

Once you have it setup, you're ready to grab the user's timeline data. For more information, on user_timeline and what it returns, start [here](https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline).

Here's a sample of the data returned by a user_timeline query, for one tweet:

```
{
    "coordinates": null,
    "favorited": false,
    "truncated": false,
    "created_at": "Wed Aug 29 17:12:58 +0000 2012",
    "id_str": "240859602684612608",
    "entities": {
      "urls": [
        {
          "expanded_url": "https://dev.twitter.com/blog/twitter-certified-products",
          "url": "https://t.co/MjJ8xAnT",
          "indices": [
            52,
            73
          ],
          "display_url": "dev.twitter.com/blog/twitter-c\u2026"
        }
      ],
      "hashtags": [
 
      ],
      "user_mentions": [
 
      ]
    },
    "in_reply_to_user_id_str": null,
    "contributors": null,
    "text": "Introducing the Twitter Certified Products Program: https://t.co/MjJ8xAnT",
    "retweet_count": 121,
    "in_reply_to_status_id_str": null,
    "id": 240859602684612608,
    "geo": null,
    "retweeted": false,
    "possibly_sensitive": false,
    "in_reply_to_user_id": null,
    "place": null,
    "user": {
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_sidebar_border_color": "C0DEED",
      "profile_background_tile": false,
      "name": "Twitter API",
      "profile_image_url": "http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
      "created_at": "Wed May 23 06:01:13 +0000 2007",
      "location": "San Francisco, CA",
      "follow_request_sent": false,
      "profile_link_color": "0084B4",
      "is_translator": false,
      "id_str": "6253282",
      "entities": {
        "url": {
          "urls": [
            {
              "expanded_url": null,
              "url": "http://dev.twitter.com",
              "indices": [
                0,
                22
              ]
            }
          ]
        },
        "description": {
          "urls": [
 
          ]
        }
      },
      "default_profile": true,
      "contributors_enabled": true,
      "favourites_count": 24,
      "url": "http://dev.twitter.com",
      "profile_image_url_https": "https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
      "utc_offset": -28800,
      "id": 6253282,
      "profile_use_background_image": true,
      "listed_count": 10775,
      "profile_text_color": "333333",
      "lang": "en",
      "followers_count": 1212864,
      "protected": false,
      "notifications": null,
      "profile_background_image_url_https": "https://si0.twimg.com/images/themes/theme1/bg.png",
      "profile_background_color": "C0DEED",
      "verified": true,
      "geo_enabled": true,
      "time_zone": "Pacific Time (US & Canada)",
      "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
      "default_profile_image": false,
      "profile_background_image_url": "http://a0.twimg.com/images/themes/theme1/bg.png",
      "statuses_count": 3333,
      "friends_count": 31,
      "following": null,
      "show_all_inline_media": false,
      "screen_name": "twitterapi"
    },
    "in_reply_to_screen_name": null,
    "source": "<a href=\"http://sites.google.com/site/yorufukurou/\" rel=\"nofollow\">YoruFukurou</a>",
    "in_reply_to_status_id": null
  }
```

Even if you're processing the data client-side, it still makes sense to remove properties you don't need server-side. I generally cut out properties related to the user's profile (starting from 'default profile', and moving down to 'screen_name'). These properties are generally consistent across tweets and provide little insight. 

## Getting Started

Pass the data returned from the Twitter API into the Insights constructor, and use prototype methods to extract insights and datasets. 

```
var data = $.getJSON('twitter.api.request').done(function(data) {

	var insights = new Insights(data),

	    // returns insights about profanity usage in tweets

	    profanity = insights.profanity(), 

	    // returns insights about positive and negative sentiments expressed in user's tweets
	    
	    sentiments = insights.sentiments(), 

	    // returns a dataset of tweets organized by year, month, and day
	    
	    tweetsByDay = insights.tweetCalendar(); 

});

```
## API Reference

(still need to go through and decide on naming conventions)

### Datasets

**tweetCalendar()**

Returns tweets organized into years, months, and days. 

Example:

```
{
   "2012":{
      "06":{
         "26":[
            {
               // individual tweet data #1
            }

         ],
         "27":[
            {
               // individual tweet data #2
            },
            {
              // individual tweet data #3
            }
         ],
	"28":[
            {
               // individual tweet data #4
            },
            {
              // individual tweet data #5
            }
         ]
}
```

**tweetsByDay()**

Returns tweets organized by the day they were tweeted. 

Example:

```
{
   "20120726":[
      {
          // individual tweet #1
      }
   ],
   "20120727":[
      {
         // individual tweet data #2
      },
      {
         // individual tweet data #3
      },
      {
         // individual tweet data #4
      }
   ],
   "20120728":[
      {
         // individual tweet data #5
      },
      {
         // individual tweet data #6
      }
   ]

}

```
**tweetsByHour()**

Returns tweets sorted by the hour of the day they were tweeted (0-23)

Example:

```

{
   "0":[
	{
	  // tweet data 1
	},
	{
	  // tweet data 2
	},
	{
	  // tweet data 3
	}
	],

   "1":[
	{
	  // tweet data 4
	}
]

```

tweetsByMonth()

tweetsByYear()

tweetsWithDates()

textByDay()

textForTotals()

### Insights

fauxpas()

hashtags()

narcissism()

people()

profanity()

reading()

sentiments()

vocabulary()

## Dependencies 

This project has one hard dependency: [LoDash](http://lodash.com/). 

## Performance

For large datasets (Twitter allows you to pull up to 3200 tweets), some Insights methods can take several seconds to process. This will lock up the browser completely. If this is what you're experiencing, I highly recommend using Web Workers to extract these insights in the background so as to not affect the user's experience of your application. 


