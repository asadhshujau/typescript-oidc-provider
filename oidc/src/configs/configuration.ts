import { Configuration } from "oidc-provider"
import * as accountService from "../services/account.service"

export const oidcProviderUrl = process.env.OIDC_ISSUER_URL || 'http://localhost:3000'
export const configuration: Configuration = {
  async findAccount(ctx, id) {
    const account = { emailVerified: true, email: "ebrahimmfadae@gmail.com" }

    if (!account) return undefined

    return {
      accountId: id,
      async claims(_, scope) {
        if (!scope) return undefined
        const openid = { sub: id }
        const email = {
          email: account.email,
          email_verified: account.emailVerified
        }
        const accountInfo = {}
        if (scope.includes('openid')) Object.assign(accountInfo, openid)
        if (scope.includes('email')) Object.assign(accountInfo, email)
        return accountInfo
      },
    }
  },
  clients: [
    {
      client_id: "app",
      client_secret: "scorpion",
      redirect_uris: ["http://localhost:3005/cb"],
      grant_types: ["authorization_code"],
      scope: "openid email profile phone address offline_access",
    },
  ],
  claims: {
    address: ["address"],
    email: ["email", "email_verified"],
    phone: ["phone_number", "phone_number_verified"],
    profile: [
      "birthdate",
      "family_name",
      "gender",
      "given_name",
      "locale",
      "middle_name",
      "name",
      "nickname",
      "picture",
      "preferred_username",
      "profile",
      "updated_at",
      "website",
      "zoneinfo",
    ],
  },
  pkce: { required: () => false, methods: ["S256"] },
  features: {
    devInteractions: { enabled: false }
  }
}
