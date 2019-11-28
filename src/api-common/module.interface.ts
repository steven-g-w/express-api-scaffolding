import { Container } from 'inversify';
import { Router } from 'express';

export interface IModule {
  registerDomainServices(container: Container): void;
  registerResourceAccessServices(container: Container): void;
  getModuleRouter(container: Container): Router;
}
