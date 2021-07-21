const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const date = require(__dirname + '/date.js');


const app = express();
const items = ['Buy Food', 'Cook Food', 'Eat Food'];
app.set('view engine', 'ejs');

const workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
   
    let day = date.getDate ();
    res.render('list', {kindOfDay: day , newListItems: items});
  
});

app.post('/', function(req, res){
    let item = req.body.newItem;
    if(req.body.list == 'work'){      
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(item);
        res.redirect('/');
    }
});

app.get('/work', function(req, res){
    res.render('work', {listTitle: 'work', workItems: workItems});
});

app.get('/about', function(req, res){
    res.render('about');
});



app.listen(3000, function(){
    console.log('server running on port 3000');
});