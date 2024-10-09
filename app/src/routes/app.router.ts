import Router from "koa-router"
import appController from "../controllers/app.controller"

export default () => {
    const router = new Router()
    const { sampleApp } = appController()
    router.get("/", sampleApp)
    return router
}
