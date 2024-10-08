import { Service } from 'typedi';
//@ts-ignore
import type ESMProvider, { interactionPolicy, errors } from 'oidc-provider';

export type Provider = ESMProvider;
export type ProviderClass = { new (...args: ConstructorParameters<typeof ESMProvider>): Provider };
export type OidcProviderModule = { Provider: ProviderClass, interactionPolicy: typeof interactionPolicy, errors: typeof errors };

const dynamicImport = async <ReturnType>(packageName: string): Promise<ReturnType> =>
  new Function(`return import('${packageName}')`)();

@Service()
export class OidcProviderModuleFactory {
  async create(): Promise<OidcProviderModule> {
    const { default: ProviderClass, ...rest } = await dynamicImport<{ default: ProviderClass } & Omit<OidcProviderModule, 'Provider'>>(
      'oidc-provider',
    );

    return {
      Provider: ProviderClass,
      ...rest,
    };
  }
}
