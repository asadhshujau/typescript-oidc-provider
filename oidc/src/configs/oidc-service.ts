import { configuration, oidcProviderUrl } from './configuration'
import { Service } from 'typedi'
import { OidcProviderModuleFactory, Provider } from './oidc-provider-module'

@Service()
export class OidcService {
  private oidc: Provider | null = null
  private initializationPromise: Promise<void>;


  constructor(private readonly oidcProviderModuleFactory: OidcProviderModuleFactory) {
    this.initializationPromise = this.initialize()
  }

  private async initialize() {
    const opm = await this.oidcProviderModuleFactory.create()
    this.oidc = new opm.Provider(oidcProviderUrl, configuration)
  }

  public async getOidc(): Promise<Provider> {
    await this.initializationPromise
    if (!this.oidc) {
      throw new Error("OIDC provider not initialized")
    }
    return this.oidc
  }
}
