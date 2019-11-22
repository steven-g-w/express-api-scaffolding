import { Container } from 'inversify';

export interface IModule {
  registerDomainServices(container: Container): void;
  registerResourceAccessServices(container: Container): void;
}
