var express=require('express');
var mongoose=require('mongoose');
var model = require('./model/todomodel');
var app = express();
var bodyParser=require('body-parser');
var controller=require('./controller/todocontroller');
var useragent=require('express-useragent');
app.use(express.static('./public'));


// setup template engine
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
controller(app,useragent,mongoose,model);

var port = Number(process.env.PORT || 8080);
app.listen(port);
