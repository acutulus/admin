//sign-in : POST-https://staging.meet.fm/users/sign_in/ 
//			BODY-{"user":{"login":"admin@qivana.com","password":"qivana123","remember_me":false}}

//update-info : PUT-https://staging.meet.fm/documents/1930.json
//				BODY-{"display_data":{"url":"https://{{subdomain}}.jamberry.com/product/whispa",
//					  "itemcode":"4486"},"name":"1K03_Whisper_Icon.jpg",position:1} 


var https = require('https');

var signinOptions = {
						hostname:"https://staging.meet.fm",
						path:"/users/sign_in/",
						method:"POST",
						body:{"user":{"login":"admin@qivana.com","password":"qivana123","remember_me":false}}
					}
var signinRequest = https.request(signinOptions, function(res){
	console.log(res)
})