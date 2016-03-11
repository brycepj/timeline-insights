# Timeline Insights

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

### Datasets

**tweetCalendar()**

Returns tweets organized into years, months, and days. 

Example:

```
{
   "2012":{
      "06":{
         "26":[
            { // tweet data 1 }

         ],
         "27":[
            { // tweet data 2 },
            { // tweet data 3 }
         ],
	"28":[
            { // tweet data 4 },
            { // tweet data 5 }
         ]
}
```

**tweetsByDay()**

Returns tweets organized by the day they were tweeted. 

Example:

```
{
   "20120726":[
      { // tweet data 1 }
   ],
   "20120727":[
      { // tweet data 2 },
      { // tweet data 3 },
      { // tweet data 4 }
   ],
   "20120728":[
      { // tweet data 5 },
      { // tweet data 6 }
   ]

}

```
**tweetsByHour()**

Returns tweets sorted by the hour of the day they were tweeted (0-23)

Example:

```

{
   "0":[
	{ // tweet data 1 },
	{ // tweet data 2 },
	{ // tweet data 3 }
	],

   "1":[
	{ // tweet data 4 }
]

```

**tweetsByMonth()**

Returns tweets sorted by the month of year they were tweeted (0-11)

Example:

```

{
   "0":[
	{ // tweet data 1 },
	{ // tweet data 2 },
	{ // tweet data 3 }
	],

   "1":[
	{ // tweet data 4 }
]

```

**tweetsByYear()**

Returns tweets sorted by the year they were tweeted

Example:

```

{
   "2012":[
	{ // tweet data 1 },
	{ // tweet data 2 },
	{ // tweet data 3 }
	],

   "2011":[
	{ // tweet data 4 }
]

```

**tweetsWithDates()**

Returns tweets, sorted chronologically, with "moment" data incorporated. Pass in "simple" to bypass using Moment.JS and simply add property "dateStr" which is string representing the date of the tweet.

Example: (most tweet data properties removed)

```
[
   {
      "coordinates":null,
      "in_reply_to_screen_name":null,
      "in_reply_to_user_id":null,
      "truncated":false,
      "moment": {
	_a:[ 0: 2012, 1: 06, 2: 26, 3: 16, 4: 48, 5: 30, 6: 0],
	_d: Thu Jul 26 2012 16:48:30 GMT-0400 (EDT)
	_f: "YYYY-MM-DD hh:mm:ss"
	_i: "2012-07-26 16:48:30"
	_isAMomentObject: true
	_isUTC: false
	_l: undefined
	_pf: Object"
	},
      "dateStr":"20120627"
   }
]

```

**textByDay()**

Returns tweet text sorted by day, broken up by word into arrays. Useful for text analysis. 

Example: 

```
{
   "20120726":[
      "Twitter Status http://t.co/po9dIsjx via @twitter"
   ],
   "20120727":[
      "Cool. RT @DigitalTrends: Olympic tech 2012: Gadgets and gizmos of the games http://t.co/H2hy2Mu6",
      "RT @mashsocialmedia: Facebook: Sponsored Stories Make $1 Million a Day http://t.co/HKx7HFLX",
      "Olympians to follow: http://t.co/MSob9f8q #London2012"
   ],
   "20120728":[
      "“@_BadLuckBri: Life gives him lemons. And aids” @TrygveJensen",
      "NBC thinks you're dumb http://t.co/SnB1OVu6"
   ]
}
```

**textForTotals()**

Returns 3 objects: forWords, forSentences, and fullText. 

*textForTotals().forWords*

Returns tweets sorted chronologically, as arrays broken up by words. All symbols and URLs removed.

*textForTotals().forSentences*

Returns tweets sorted chronologically, as arrays broken up by words. All symbols, hashtags, and URLs removed, except for sentence-ending punctuation marks. This allows for sentence-based analysis.

*textForTotals().fullText*

Returns tweet text sorted chronologically, as strings, not arrays.

Example: 

```
{
   	"wordLevel":[
	      ["twitter", "status","via"],
	      ["cool","rt","olympic","tech","2012","gadgets","and","gizmos","of","the","games"],
	      ["olympians","to","follow","london2012"]
		],

	"sentenceLevel":[
		["cool","new","feature","released!","gush","a","story","and","it","gets","pushed","to","your","facebook","timeline!"],
   		["it","couldn't","go","on","forever","you","know","facebook","will","soon","force","you","to","switch","to","timeline","by"]
	],

	fullText:[
	   "Twitter Status http://t.co/po9dIsjx via @twitter",
	   "Cool. RT @DigitalTrends: Olympic tech 2012: Gadgets and gizmos of the games http://t.co/H2hy2Mu6",
	   "RT @mashsocialmedia: Facebook: Sponsored Stories Make $1 Million a Day http://t.co/HKx7HFLX",
	   "Olympians to follow: http://t.co/MSob9f8q #London2012",
	   “@_BadLuckBri:Life gives him lemons. And aids”
	]

```

### Insights

**fauxpas()**

*fauxpas().plsRT()*

Returns insights on use (and variations) of the phrase "please RT". 

*fauxpas().rant()*

Returns insights on instances when tweets occur multiple times in the same minute. 

** I would love some help adding to this method. I'm sure there are many more fauxpas we can discover.

**hashtags()**

Returns data about hashtag use, including all hashtags used, counts of hashtags used, examples of tweets with many hashtags used (and more). 

**narcissism()**

Returns data uses of self-centered language, including narcissism levels overall, most self-centered tweets, quantitative breakdown of self-centered word use (and more). 

**people()**

Returns insights about the people a user tweets at the most, who they retweet the most, who they mention the most, as well as breakdowns of their tweets by 'replies', 'retweets', and 'statements'.

**profanity()**

Returns insights about profanity use in tweets, including favorite profanity, and frequency of use.

**reading()**

Returns established text analysis statistics: Flesh-Kinkaid Grade Level and Ease, and Fog Scale.

**sentiments()**

Returns all sorts of interesting information about people's positive and negative sentiments, as communicated by their tweets. It uses the AFFIN sentiment scoring, which asigns words a score from -4 through +4. 

**vocabulary()**

Returns information about the breadth of the user's vocabulary (the number of unique words they use).

**all()**

Returns an object containing all the values of all Insights methods. 


