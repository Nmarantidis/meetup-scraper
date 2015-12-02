// var valid_cookie = '*YOUR COOKIE FOR MEETUP*'
var valid_cookie = '__cfduid=db59ce5211255d3cac027ff032ccbbb8e1445266223; MEETUP_TRACK="id=4a04aed8-4acb-413c-822b-10caa8a15ed2&l=1&s=ae4d4b7cb609356f2497860c22a86e695f99a4b0"; MEETUP_SEGMENT=member; MEETUP_CSRF=879e300f-03be-4476-befb-6477d92e3d5b; _gat=1; _gat_granular=1; _gat_personal=1; trax_universal_reg=uuid=35e45747-11d7-48c3-86c0-9cf9a4576626&v=track&p=login&s=15&_=1b0f0f; MEETUP_MEMBER="id=129034112&status=1&timestamp=1449072826&bs=0&tz=US%2FEastern&zip=10001&country=us&city=New+York&state=NY&lat=40.75&lon=-73.99&ql=false&s=9cfbf2770753a789efd58d63bf463a158edc7c7e&scope=ALL&rem=1"; MEETUP_LANGUAGE="language=en&country=US"; MEETUP_SESSION="id=17d26537-7f59-4c11-b378-b00c3961993c"; trax_event_groupage_model=uuid=ce9c4ea2-3468-4e6d-881d-171c7c05d57f&v=group_age&p=start&s=0&_=6be246; trax_event_groupage_model_withage=uuid=e91906d1-0ef8-42a4-bb0a-823019c1b409&v=group_age&p=start&s=0&_=e45d19; click-track=%7B%22history%22%3A%5B%7B%22lineage%22%3A%22a%3Ch4%3C%23meta-organizers%3C%23C_metabox%3C%23C_nav%3C%23C_context%3C%23C_pageBody%3C%23C_page%22%2C%22linkText%22%3A%22Organizer%3A%22%2C%22coords%22%3A%5B-461%2C747%5D%2C%22data%22%3A%7B%7D%7D%5D%7D; MUP_jqueryEn=on; bandit_member_mug_1p=v=k; _ga=GA1.2.247594971.1445266224';


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

