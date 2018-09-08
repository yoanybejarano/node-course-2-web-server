const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date();
    var time = now - req.start;
    var log = `${now.toString()}: ${req.method} ${req.url} ${res.statusCode}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log')
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => { 
    res.render('projects',{
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
