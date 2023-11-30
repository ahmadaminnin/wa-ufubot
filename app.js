const qrcode = require('qrcode-terminal');
var request = require('request-promise'); 

async function askGPT(user_msg) { 

	// This variable contains the data 
	// you want to send 

	var options = { 
		method: 'POST', 

		// http:flaskserverurl:port/route 
		uri: 'http://34.125.230.140/ask_gpt', 
		body: user_msg, 

		// Automatically stringifies 
		// the body to JSON 
		json: true
	}; 
    var response;
	var sendrequest = await request(options) 

		// The parsedBody contains the data 
		// sent back from the Flask server 
		.then(function (parsedBody) { 
			// console.log(parsedBody); 
			
			// You can do something with 
			// returned data 
			let result; 
			result = `${parsedBody["result"]}`;
			// console.log(result); 
            response = `${result}`;
		}) 
		.catch(function (err) { 
			console.log(err); 
		}); 

    return response;
    
}

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body) {
        askGPT(message.body).then(function(result){
            client.sendMessage(message.from, result);
        })
        // console.log(askGPT(message.body));
	}
});
 

client.initialize();
