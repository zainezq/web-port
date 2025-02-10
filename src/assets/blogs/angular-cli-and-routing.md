# Angular CLI and Routing

By Zaine Qayyum

---

## Introduction

Angular is a popular open-source web application framework developed and maintained by Google. It is written in TypeScript and allows developers to build dynamic, single-page web applications (SPAs) with a modular and component-based architecture. Angular provides a powerful set of tools and features for building robust and scalable web applications.

Key features of Angular include:

- Two-way data binding  
- Dependency injection  
- Directives for extending HTML  
- Services for reusable business logic  
- Modular architecture with components  
- Routing for building SPAs (Single Page Applications)  

## How to use Angular CLI?

Angular CLI (Command Line Interface) is a command-line tool that simplifies the process of creating, building, testing, and deploying Angular applications. It provides a set of commands to perform various tasks such as creating new projects, generating components, services, modules, and more. The Angular CLI abstracts away many configuration details and helps developers follow best practices.

To install Angular CLI, you can use the following command:

```bash
npm install -g @angular/cli
```

Now to understand Angular files and directories, the structure below is what is generally stored in the `/src/main/webapp/app` directory. This is where the front-end work is done.

- `/src/main/webapp/app/shared`: Shared components, services, and utilities used across the application.  
- `/src/main/webapp/app/entities`: Subdirectories for each entity in the application, with components, services, and models specific to that entity.  
- `/src/main/webapp/app/layouts`: Layout components such as headers, footers, and navigation menus.  
- `/src/main/webapp/app/admin`: Administrative components and modules.  
- `/src/main/webapp/app/core`: Core services, interceptors, guards, and modules.  
- `/src/main/webapp/app/main.ts`: The main entry point for the Angular application.  
- `/src/main/webapp/app/app.module.ts`: The root module where you define application-wide dependencies and configurations.  
- `/src/main/webapp/app/app-router.module.ts`: The Angular router module where you define application routes.  
- `/src/main/webapp/content/css`: CSS stylesheets for styling the application.  
- `/src/main/webapp/content/images`: Image assets used in the application UI.  

## Creating a new page

When you want to create a new page within the application, go to the `/src/main/webapp/app` directory, and run the command:

```bash
ng generate component my-new-page
```

This will generate a new component within the app. `ng` automatically generates the `.html`, `.scss`, `.spec.ts`, and the main `.ts` component. We now need to do two things:

1. Update the routing link by going to the `/app-router.module.ts` file and adding this:

```typescript
{   
  path: 'my-new-page',   
  component: MyNewPageComponent,   
  data: {     
    pageTitle: 'My New Page'   
  }
}
```

2. Add a link so the page can be accessed:

```html
<!-- In your navigation component template -->
<a routerLink="/my-new-page">My New Page</a>
```

## Imports and @

- The `import` keyword is used to bring functionality from external modules (Angular modules, components, services, and other features) into your code.

For example:

```typescript
import { Component } from '@angular/core';
```

- In Angular, the `@` symbol is often used in decorators. Decorators are special types of declarations that can be attached to class declarations, methods, accessors, properties, or parameters. They are used to modify the behavior of the target they decorate.

Decorators are a way to configure and enhance classes in a declarative manner. They are applied using the `@` symbol followed by the decorator name.

```typescript
@Component({
  selector: 'jhi-my-new-page',
  templateUrl: './my-new-page.component.html',
  styleUrls: ['./my-new-page.component.scss']
})
export class MyNewPageComponent {
  // class implementation
}
```

In this example, `@Component` is a decorator that is used to define metadata for an Angular component. It specifies the selector, template, and style files for the `MyNewPageComponent`.

More information on CLI can be found [here](https://angular.io/cli)

A tutorial on AngularJS can be found [here](https://www.w3schools.com/angular/)

