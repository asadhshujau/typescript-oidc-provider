// import 'dotenv/config'
import Koa from 'koa'
import render from 'koa-ejs'
import koaStatic from 'koa-static'
import path from 'path'
import routes from './routes'

const app = new Koa()
render(app, {
    cache: false,
    viewExt: 'ejs',
    layout: false,
    root: path.resolve('app/src/views')
})

app.use(koaStatic(path.resolve("public")))
app.use(routes().routes())
app.listen(process.env.PORT || 3005, () => console.log(`oidc-provider listening on port ${process.env.PORT || 3005}`))

