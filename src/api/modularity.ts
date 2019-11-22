import { IModule } from '../api-common/module.interface';
import { EmployeesModule } from '../api-modules/employees/employees-module';
import { Container } from 'inversify';

export const modules: IModule[] = [
  new EmployeesModule()
];

export const registerDomainServices = (container: Container) =>
  modules.forEach(module => module.registerDomainServices(container));

export const registerResourceAccessServices = (container: Container) =>
  modules.forEach(module => module.registerResourceAccessServices(container));
