if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express'); // pulls express into app
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const axios = require('axios')
const bodyParser = require('body-parser');


// pushing to a web host, will pick up PORT env var
// locally, port is 5000
const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


function call_api(finishedAPI, stockTicker) {
	const token = process.env.IEX_CLOUD_TOKEN
	const url = "https://cloud.iexapis.com/stable/stock/" + stockTicker + "/quote?token=" + token
	console.log("GET " + url);
	axios.get(url)
	.then(res => {
		console.log("Status Code: ", res.status);
		finishedAPI(res.data);
	})
	.catch(err => {
		console.log("Error: ", err.message);
		finishedAPI(err.message);
	});
}

// Set Handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherStuff = "other stuff";


// set handlebar routes
app.get('/', (req, res) => {
	call_api(function(doneAPI) {
		res.render('home', {
    		stock: doneAPI
    	});
	}, "fb");    
});

app.post('/', (req, res) => {
	// posted_stuff = req.body.stock_ticker;
	call_api(function(doneAPI) {
		res.render('home', {
			stock: doneAPI
		});
	}, req.body.stock_ticker);
});

app.get('/about.html', (req, res) => {
	res.render('about', {

	});
});

// set static folder
// this sets all the routing for static files, yay for basic pages!
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Sever Listening on port " + PORT));

