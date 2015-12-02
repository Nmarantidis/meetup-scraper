var valid_cookie = '*YOUR COOKIE FOR MEETUP*'


var myArgs = process.argv.slice(2);
var the_group = myArgs[0];

var request = require("request");
var fs = require("fs");
var meetup_ids = fs.readFileSync(the_group+'.txt', 'utf8');

var cheerio = require('cheerio');

var member_id = meetup_ids.split(",\n");


 for (var i in member_id) {
 	(function (i) {
		request({
			uri: "http://www.meetup.com/"+the_group+"/members/"+member_id[i]+"/",
			method: "GET",
			headers: {
				'Cookie': valid_cookie
			},
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10
		}, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);

				$('.D_memberProfileContentItem p').filter(function(){

					var data = $(this);
					var title = data.text() + ',\n';

					if(title.indexOf("@") > -1) {
						console.log(i, title);
						fs.appendFile(the_group+'.csv', title, encoding='utf8', function (err) {
							if (err) throw err;
						});
					}

	            });
				// $('.D_group.subtext.last').filter(function(){

				// 	var data = $(this);
				// 	var title = data.text() + ',\n';

				// 	if(title.indexOf("This member chose not to make their Meetup membership information public") > -1) {
				// 		console.log(i, title);
				// 		fs.appendFile(the_group+'.csv', title, encoding='utf8', function (err) {
				// 			if (err) throw err;
				// 		});
				// 	}

	   //          });
			}
		});
		console.log(member_id[i]);
	})(i);
}

