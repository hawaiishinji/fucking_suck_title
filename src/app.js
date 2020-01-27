const Koa = require('koa');  
const axios = require('axios');  
const Router = require('koa-router'); 
const logger = require('koa-logger'); 
const serve = require('koa-static');
const cors = require('koa-cors');
const BodyParser = require("koa-bodyparser");
const app = new Koa(); 
const HttpStatus = require("http-status");
const queryString = require('query-string')

const router = Router();  
const pageId = '101873064694928'
const access_token = 'EAAlNS0rpJJEBAEANdyxXsW1VCPDt3Ed99sRHVyzda2hZBHFZANwVl7yIZAZCsSyPZBy1t8rGZAQEKpEmCsKyb8sLUpLjti6MZCzlLJxRbjlbtHNZCyWLPXZA8p3s3A7c13QPOZAcBcZAyJUTJZBIzQo2w7nO0rF9R4N54HoLFHIo7tRcwQZDZD'
/** 
在此可組合各種 Middleware
**/ 
app.use(BodyParser());
app.use(logger());
app.use(cors());

app.use(serve(__dirname + '/../frontend/build'));

router.post('/api/post', async(ctx) => {     

    console.log('headers', ctx.request.headers)
    const {message, link} = ctx.request.body
    if (!message && !link) {

        ctx.status = HttpStatus.BAD_REQUEST
        return
    }
    try {
        const url = queryString.stringifyUrl({url: `https://graph.facebook.com/${pageId}/feed`, query: {link, message, access_token}});
        console.log('url', url)
        const result = await axios.post(url)
        console.log('result', JSON.stringify(result.data))
        ctx.body = 'success'
    } catch (error) {
        if (error.response) {
            console.log('status', error.response.status, error.response.data)
            ctx.body = JSON.stringify(error.response.data)
        } else {

            console.log(error)
            ctx.body = JSON.stringify(error)
        }
    }
});  

app.use(router.routes());  
const port = process.env.NODE_ENV === 'dev' ? 3001 : 80
app.listen(port, () => {
    console.log(`server listen on port ${port} NODE_ENV: ${process.env.NODE_ENV}`)
});