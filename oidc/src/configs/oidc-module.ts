import { Container } from 'typedi';
import { OidcProviderModuleFactory } from './oidc-provider-module';
import { OidcService } from './oidc-service';

export function initializeOidcModule() {
  Container.set(OidcProviderModuleFactory, new OidcProviderModuleFactory());
  Container.set(OidcService, new OidcService(Container.get(OidcProviderModuleFactory)));
}
