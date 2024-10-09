import { Middleware } from "koa"

export default (): { [key: string]: Middleware } => ({
    sampleApp: async (ctx) => {
        return ctx.render("sample-app", {
            title: "Sample App",
            authServerUrl: process.env.OIDC_ISSUER_URL || 'http://localhost:3000',
            appUrl: process.env.APP_URL || 'http://localhost:3005',
            clientId: "app",
        })
    },
})
