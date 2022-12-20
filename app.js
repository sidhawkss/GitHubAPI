const https = require('https');
require('dotenv').config();

const username = process.argv[2];

const options = {
	method: 'GET',
	host: 'api.github.com',
	port: 443,
	headers: {
		'User-Agent':'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
		'Accept':'application/vnd.github+json',
		'Authorization' : 'Bearer ' + process.env.GITHUB_TOKEN
	},
	path: `/users/${username}/repos`
}

https.get(options, handleResponse);

function handleResponse(response){
	// Handle request data 
	let data = '';
	response.on('data', (chunk) => {
		data += chunk;
	});
	
	response.on('end', () =>{
		const obj = JSON.parse(data);
		console.log('Listing the repos: ');
		for(var i in obj){
			console.log('    '+obj[i].full_name);
		}
	});

}







