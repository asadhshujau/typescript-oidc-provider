import { Account, AccountClaims, Configuration, FindAccount } from "oidc-provider"
import * as accountService from "../services/account.service"
import { MongoDbAdapter } from '../adapters/mongodb'

export const oidcProviderUrl = process.env.OIDC_ISSUER_URL || 'http://localhost:3000'

const findAccount: FindAccount = async (ctx, id) => {
  // Simulating account lookup
  const accountDetails = await accountService.get(id) // { emailVerified: true, email: "ebrahimmfadae@gmail.com" };

  if (!accountDetails) return undefined;

  const account: Account = {
    accountId: id,
    async claims(use, scope) {
      const claims: AccountClaims = {
        sub: id
      };

      if (scope?.includes('email')) {
        claims.email = accountDetails.email;
        claims.email_verified = accountDetails.emailVerified;
      }

      return claims;
    },
  };

  return account;
};

export const configuration: Configuration = {
  adapter: MongoDbAdapter,
  findAccount,
  clients: [
    {
      client_id: "app",
      client_secret: "scorpion",
      redirect_uris: ["http://localhost:3005/cb"],
      grant_types: ["authorization_code"],
      scope: "openid email profile phone address offline_access",
    },
    {
      client_id: "api",
      client_secret: "night-wolf",
      redirect_uris: [],
      response_types: [],
      grant_types: ["client_credentials"],
      scope: "openid email profile phone address",
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
    devInteractions: { enabled: false },
    introspection: {
      enabled: true,
      allowedPolicy: (ctx, client, token) => {
        if (
          client.introspectionEndpointAuthMethod === "none" &&
          token.clientId !== ctx.oidc.client?.clientId
        ) {
          return false;
        }
        return true;
      }
    },
    resourceIndicators: {
      defaultResource(ctx) {
        return Array.isArray(ctx.oidc.params?.resource)
          ? ctx.oidc.params?.resource[0]
          : ctx.oidc.params?.resource;
      },
      getResourceServerInfo(ctx, resourceIndicator, client) {
        return {
          scope: "api:read offline_access",
        };
      },
    }
  }
}
