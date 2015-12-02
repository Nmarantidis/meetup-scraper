// var myArgs = process.argv.slice(2);
// var the_group = myArgs[0];

// var request = require("request");
// var fs = require("fs");

// request({
//   uri: "https://api.meetup.com/2/members?offset=0&format=json&group_urlname=WomenWhoCodeNYC&photo-host=public&page=3135&order=name&sig_id=129034112&sig=9d94c5caa30d572c43f89535e60d365ae03f9969",
//   method: "GET",
//   timeout: 10000,
//   followRedirect: true,
//   maxRedirects: 10
// }).pipe(fs.createWriteStream(the_group+".json"));

var valid_cookie = '*YOUR COOKIE FOR MEETUP*'

var request = require("request");
var fs = require("fs");
var cheerio = require('cheerio');

var myArgs = process.argv.slice(2);
var the_group = myArgs[0];
var member_count = myArgs[1];
var member_id = '';

for(var i = 0; i<member_count; i++) {
    // console.log(obj.results[i]);
    // member_id = obj.results[i].id;
    // console.log(member_id);
    if((i % 20) === 0) {
    // if(i === 0){
		request({
			uri: "http://www.meetup.com/"+the_group+"/members/?offset="+i+"&sort=social&desc=1",
			method: "GET",
			headers: {
				'Cookie': valid_cookie
			},
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 1000
		}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);


				$('.memberInfo').each(function(j, elem) {
					member_id = ($(this).attr('data-memid')) + ',\n';
					console.log(the_group, member_id);
					fs.appendFile(the_group+'.txt', member_id, encoding='utf8', function (err) {
						if (err) throw err;
					});
				});

			}
		});
	}
	if(i === member_count-1){

	}
}