import Router from "koa-router"
import appController from "../controllers/app.controller"

export default () => {
    const router = new Router()
    const { callback, sampleApp, registerForm } = appController()

    router.get("/", sampleApp)
    router.get("/cb", callback)
    router.get("/register", registerForm);

    return router
}
