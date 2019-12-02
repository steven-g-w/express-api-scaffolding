import { IModule } from '../api-common/module.interface';
import { EmployeesModule } from '../api-modules/employees/employees-module';
import { Container } from 'inversify';
import { Express } from 'express';

const modules: IModule[] = [
  new EmployeesModule(),
  // other modules one by one
];

export const registerDomainServices = (container: Container) =>
  modules.forEach(module => module.registerDomainServices(container));

export const registerResourceAccessServices = (container: Container) =>
  modules.forEach(module => module.registerResourceAccessServices(container));

export const registerControllers = (container: Container, app: Express) => {
  app.use('/employees', new EmployeesModule().getModuleRouter(container));
}

