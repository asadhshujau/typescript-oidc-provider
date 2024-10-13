import 'dotenv/config'
import cors from '@koa/cors'
import Koa from 'koa'
import router from './routes'

const app = new Koa()

app.use(cors())
app.use(router().routes())

app.listen(process.env.API_PORT, () => {
    console.log(
        `api listening on port ${process.env.API_PORT}, check http://localhost:${process.env.API_PORT}`
    )
})
