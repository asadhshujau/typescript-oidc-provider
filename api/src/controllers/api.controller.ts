import { Context, Middleware } from 'koa'

export default (): { [key: string]: Middleware } => ({
    pi: async (ctx: Context) => {
        ctx.status = 200
        ctx.message = Math.PI.toString()
    }
})
