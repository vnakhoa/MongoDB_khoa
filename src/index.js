const express = require('express')
const morgan = require('morgan')
const path = require('path')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
var methodOverride = require('method-override')

const route = require('./routes/index.routes')


//Connet to DB
const db = require('./config/db/index')
db.connect()


const app = express()
const port = 3000

//static file
app.use(express.static(path.join(__dirname, 'public')))

//Cấu hình  (bodyparser và POSTMAN TEST)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//HTTP loger
app.use(morgan('combined'));

// override
app.use(methodOverride('_method'))


//handlebar templet engine
app.engine('hbs', handlebars.engine(
    {
        extname: 'hbs',
        helpers: {
            sum: (a, b) => (a + b)
        }
    }
))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log('PATH :', path.join(__dirname, 'resource', 'views'))


//Route init
route(app);


//Listen PORT
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})