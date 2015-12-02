# Meetup Scraper
Just a simple command line scraper for scraping meetup member accounts _that you are a member of_. 

## Caution
#### It is not very ethical to take member's personal information without their concent.
#### But then again this info is made public on meetup's website... enjoy


## Setup

In meetup.js & scrape.js Replace:
```
*YOUR COOKIE FOR MEETUP*
```
With a valid cookie from your meetup account while logged in. You can get yours by right opening the network inspector in chrome and copying (right click + Copy as cURL) one of the requests. 
You only need to do this once. 

## Installation

Meetup Scraper is written in Node.js. You should have a current version installed. So please install it.


*Navigate to the meetup scraper*

```
cd /working_folder/meetup_scraper/
```

*Install dependencies*

```
npm install
```

*Get the url name of the group and the number of members*

For <a>http://www.meetup.com/My-Awesom-Metup/<a/>

The url name is _My-Awesome-Meetup_


## Quick Start

Lets say the number of members is 1234

```
node meetup My-Awesome-Meetup 1234 && node scrape My-Awesome-Meetup
```

## Done