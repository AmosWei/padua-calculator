# PaduaCalculator

By Amos Wei, 18 Jan 2023
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.


## Project structure

<pre>
app
 ┣ home
 ┃ ┣ home.component.css
 ┃ ┣ home.component.html                   => Home component for display form, chart and table
 ┃ ┣ home.component.spec.ts
 ┃ ┗ home.component.ts
 ┣ _component
 ┃ ┣ project-chart
 ┃ ┃ ┣ project-chart.component.css
 ┃ ┃ ┣ project-chart.component.html
 ┃ ┃ ┣ project-chart.component.spec.ts
 ┃ ┃ ┗ project-chart.component.ts          => Chart component for display the chart
 ┃ ┣ project-form
 ┃ ┃ ┣ project-form.component.css
 ┃ ┃ ┣ project-form.component.html
 ┃ ┃ ┣ project-form.component.spec.ts
 ┃ ┃ ┗ project-form.component.ts           => User input Forms for calculation
 ┃ ┗ project-table
 ┃ ┃ ┣ project-table.component.css
 ┃ ┃ ┣ project-table.component.html
 ┃ ┃ ┣ project-table.component.spec.ts
 ┃ ┃ ┗ project-table.component.ts          => Table component for display the table
 ┣ _directive
 ┃ ┗ percentage-suffix.directive.ts        => A customise directive for adding '%' after rates value
 ┣ _interface
 ┃ ┣ CalculatedData.ts                     => Define the calculatedData interfaces
 ┃ ┗ CapitalGrowForm.ts                    => Define the FormData interfaces
 ┣ _service
 ┃ ┣ data.service.spec.ts
 ┃ ┗ data.service.ts                       => The common service for doing calculation and provide calculated Data
 ┣ app-routing.module.ts                   => Deine Routing 
 ┣ app.component.css
 ┣ app.component.html
 ┣ app.component.spec.ts
 ┣ app.component.ts
 ┣ app.module.ts
 ┗ env.ts                                  => Define some hardcoded value which could possible pass as variable from WS

 </pre>


## Possible future improvement
<pre>
Both table and chart widget could have a full page view

for example: /table  => show the table as whole sreen
             /chart  => show the chart as whole sreen 
 </pre>
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
