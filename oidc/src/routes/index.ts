import Router from 'koa-router'
import { Provider } from '../configs/oidc-provider-module'
import authRouter from './auth.router'

export default (oidc: Provider) => {
    const router = new Router()
    router.use(authRouter(oidc).routes())
    return router
}
