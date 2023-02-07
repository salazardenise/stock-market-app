const express = require('express'); // pulls express into app
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

// pushing to a web host, will pick up PORT env var
// locally, port is 5000
const PORT = process.env.PORT || 5000;

// Set Handlebars middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherStuff = "other stuff";

// set handlebar routes
app.get('/', (req, res) => {
    res.render('home', {
    	stuff: otherStuff
    });
});

app.get('/about.html', (req, res) => {
	res.render('about', {

	});
});

// set static folder
// this sets all the routing for static files, yay for basic pages!
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Sever Listening on port " + PORT));

