import Router from "koa-router";
import authRouter from './auth.router'
import { Provider } from '../configs/oidc-provider-module'

export default (oidc: Provider) => {
  const router = new Router();
  router.use(authRouter(oidc).routes());
  return router;
};
