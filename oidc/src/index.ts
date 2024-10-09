import 'dotenv/config'
import 'reflect-metadata'
import Koa from 'koa'
import render from 'koa-ejs'
import mount from 'koa-mount'
import koaStatic from 'koa-static'
import path from 'path'
import Container from 'typedi'
import { initializeOidcModule } from './configs/oidc-module'
import { OidcService } from './configs/oidc-service'

initializeOidcModule()

// const oidcService = Container.get(OidcService)

const start = async () => {
    const app = new Koa()
    render(app, {
        cache: false,
        viewExt: 'ejs',
        layout: false,
        root: path.resolve('oidc/src/views'),
    })
    const oidcService = Container.get(OidcService)
    const provider = await oidcService.getOidc()
    app.use(koaStatic(path.resolve('public')))
    app.use(mount(provider.app))
    app.listen(process.env.OIDC_ISSUER_PORT || 3000, () => console.log(`oidc-provider listening on port ${process.env.OIDC_ISSUER_PORT || 3000}`))
}

void start()
