const express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
app.use("/images", express.static('./images'));
app.use("/portfolio.html", express.static("./portfolio.html"));
// app.use("/recommendations.html", express.static("./recommendations.html"));
app.use("/about_me.html", express.static("./about_me.html"));
app.use("/resume.html", express.static("./resume.html"));
var urlencodedParser = bodyParser.json({ extended: false});
var main= fs.readFileSync('./index.html');
var mob = fs.readFileSync('./mobile.html');
var mainHTML = new JSDOM(main.toString());
const mobileHTML = new JSDOM(mob.toString());
app.get('/', (req, res) => {
	console.log("getting data");
	console.log(req.headers['user-agent']);
	if(req.headers['user-agent'].includes('Mobile')) {
		res.end(mobileHTML.serialize());
	}
	else {
		res.end(mainHTML.serialize());
	}	
});
	

const server = app.listen(process.env.PORT || 3002, () => {
	console.log('Server is running at 3002');
});
