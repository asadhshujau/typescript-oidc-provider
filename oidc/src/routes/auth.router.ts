import koaBody from 'koa-body'
import { Provider } from '../configs/oidc-provider-module'
import Router from 'koa-router'
import authController from '../controllers/auth.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { noCache } from "../middlewares/no-cache.middleware";

const bodyParser = koaBody()

export default (oidc: Provider) => {
    const router = new Router()
    const { abortInteraction, confirmInteraction, interaction, login, register } = authController(oidc)
    router.post("/users", bodyParser, register);

    router.post('/interaction/:uid/login', noCache, bodyParser, login)
    router.post('/interaction/:uid/confirm', noCache, confirmInteraction)
    router.get('/interaction/:uid/abort', noCache, abortInteraction)
    router.get('/interaction/:uid', noCache, interaction)

    return router
}
