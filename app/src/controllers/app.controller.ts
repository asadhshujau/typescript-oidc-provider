import { Middleware } from "koa"

export default (): { [key: string]: Middleware } => ({
    registerForm: async (ctx) => {
        return ctx.render("register", {
            title: "Register User",
            authServerUrl: process.env.OIDC_ISSUER_URL,
        })
    },
    callback: async (ctx) => {
        if ("error" in ctx.query) {
            ctx.throw(401, `${ctx.query.error}: ${ctx.query.error_description}`)
        } else {
            return ctx.render("token", {
                code: ctx.query.code,
                title: "App Callback",
                authServerUrl: process.env.OIDC_ISSUER_URL || 'http://localhost:3000',
                appUrl: process.env.APP_URL || 'http://localhost:3005',
                clientId: process.env.CLIENT_ID || 'app',
                clientSecret: process.env.CLIENT_SECRET || 'scorpion',
            })
        }
    },
    sampleApp: async (ctx) => {
        return ctx.render("sample-app", {
            title: "Sample App",
            authServerUrl: process.env.OIDC_ISSUER_URL || 'http://localhost:3000',
            appUrl: process.env.APP_URL || 'http://localhost:3005',
            clientId: process.env.CLIENT_ID || 'app',
        })
    },
})
