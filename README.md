# About this project

This repo is for code I'm writing while following along with the [Full Stack Svelte](https://www.newline.co/courses/fullstack-svelte) course over at Newline. The course itself was written/designed with Svelte 2 in Javascript, and relied heavily on the `svelte-router-spa` library to handle the routing. Rather than following along strictly with the course I opted to built it on top of Sveltekit (and Svelte 4) with Typescript integrated into both the front-end and back-end applications.

In practice this means the in stack looks like this (with changes from the course noted):

* Front-end Framework: Svelte 2 -> Sveltekit 1 (Svelte 4)
    * `svelte-router-spa` is replaced by built-in Sveltekit routing
* Back-end Framework: Express
* Data layer: PostgreSQL (using Knex as the ORM)
* Authentication (currently WIP): Auth0 with JWT

As of this writing the basic CRUD operations and API endpoints are handled along with associated front-end behavior. Logins and security are still being built, as there is some additional work needed to adapt the courses's approach to how Sveltekit/Typescript handles the same business logic.