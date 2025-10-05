# Description

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Getting Started
Before code your (Angular Project)[https://angular.dev/] you must installe node version in your computer and the Angular CLI

- The node runtime was explain in the [backend repository](https://github.com/masalinas/uniovi-robotics-workshop-backend). Go to this repo for more details:
- Install the Angular CLI](https://angular.dev/tools/cli)

```
npm install -g @angular/cli
```

## Dependencies
We must install some extra dependencies after create your Angular project:

- **Feature-rich UI components** for Angular: [primeNG v19](https://v19.primeng.org/installation)
```
npm install primeng @primeng/themes
```

- **Charting library** integrable with primeNG: [Charts.js](https://v19.primeng.org/chart) with [official documentation](https://www.chartjs.org/)

```
npm install chartsjs --save
```

- **Wrapper around MQTT.js** for Angular: [ngx-mqtt](https://www.npmjs.com/package/ngx-mqtt/v/17.0.0)
```
npm install ngx-mqtt
```

- **Feature-rich UI components** for Angular: [primeNG v19](https://v19.primeng.org/installation)
```
$ npm install primeng @primeng/themes
```

- **Charting library** integrable with primeNG: [Charts.js](https://v19.primeng.org/chart) with [official documentation](https://www.chartjs.org/)

```
npm install chartsjs --save
```

- **Wrapper around MQTT.js** for Angular: [ngx-mqtt](https://www.npmjs.com/package/ngx-mqtt/v/17.0.0)
```
npm install ngx-mqtt
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Web App
The web app recover any IMU data (accelerometer data) and paint them in a line realtime chart:

![Frontend](captures/frontend.png "Frontend")