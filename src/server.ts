import { ApplicationFactory } from './app';

ApplicationFactory.buildApplication().then(app => app.listen(3000, function () {
  console.log('The application is now running at http://localhost:3000');
}));
