import { Configuration } from "oidc-provider"
export const oidcProviderUrl = process.env.OIDC_ISSUER || 'http://localhost:3000'
export const configuration: Configuration = {
  async findAccount(_, id) {
    return {
      accountId: id,
      async claims(_, scope) {
        return { sub: id }
      },
    }
  },
  clients: [
    {
      client_id: "app",
      client_secret: "scorpion",
      redirect_uris: ["http://localhost:3005/cb"],
      grant_types: ["authorization_code"],
      scope: "openid",
    },
  ],
  pkce: { required: () => false, methods: ["S256"] },
}
