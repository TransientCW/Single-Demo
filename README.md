# single-frontend-exercise

Below you will find steps to get this starter project up and running. Following will be the requirements of the exercise.

## The Project

This basic just of this demo app is a simple message board for music performances. 
Users can create/add shows to the board and view the board itself.
The board will show the venue, artist, and date/time of each show with a link to buy tickets.

## Important
 You are allowed and **expected** to do **whatever** you want with this assignment & project.
 
 Change as much or as little as you like.
 This was only an attempt save setup time.
 Therefor, if you do not like something or its not your style... change it!
 
 This exercise is all about you. Getting to you know you, your skill level, & your coding style!

## Exercise Objective & Functionality
* Fork and clone this repo.
* Build a simple music event announcement app.
* Assume there's zero authentication/authorization.
* Once finished, submit a pull request back to this repo.

## Functionality
The app needs to be able to do the following things:
* create a `Show`.
* view all `Shows` in chronological order.
* delete a `Show`.

How you do this in terms of routes/components is up to you.

Properties of a `Show`:

* id
* venue
* artist
* ticketUrl
* eventTime
* createdAt


## Pre-Installed Packages
Since we use bootstrap at Single, we've included that as the only baked-in dependency.
* [Bootstrap](https://getbootstrap.com/docs/4.0/components/)

## Backend API
Obviously you do not currently have an api to actually use. 
However, much like in real-world development, you will need to build along side others. 
Assume that is the case here. 
Build your service assuming you have the following backend API available soon.

### Swagger Documentation
If you are familiar with `docker` or `swagger`, we've included an API documentation
file in the repo (`swagger.yml`). If you have docker installed you can view the doucmentation 
by running this from the root of the project:

```bash
docker run -itd -p 81:8080 \
    -e SWAGGER_JSON=/app/swagger.yml \
    -v $(pwd):/app \
    --name docs \
    swaggerapi/swagger-ui
```
Then visit [http://localhost:81](http://localhost:81) to view the documentation.

Another option is to open the online [Swagger Editor](https://editor.swagger.io)
and paste in the contents of the `swagger.yml` file.

### API Summary
If you're unable to view the swagger documentation for some reason, here's the endpoints
with some example request/response bodies:

#### **`POST /show`**
This creates a show.
##### Request
```json
{
  "venue": "The Ryman",
  "artist": "The Strokes",
  "ticketUrl": "https://www.ticketweb.com,",
  "eventTime": "2019-11-01T00:00:00.000Z"
}
```
##### Response
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "venue": "The Ryman",
  "artist": "The Strokes",
  "ticketUrl": "https://www.ticketweb.com/",
  "eventTime": "2019-11-01T00:00:00.000Z",
  "createdAt": "2019-10-28T15:55:45.995Z"
}
```

#### **`GET /show`**
This fetches all shows in pages.
##### Query Parameters
* `page` - the zero-indexed page number
* `size` - the number of shows to be included in each page.

##### Response
```json
{
  "content": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "venue": "The Ryman",
      "artist": "The Strokes",
      "ticketUrl": "https://www.ticketweb.com/",
      "eventTime": "2019-11-01T00:00:00.000Z",
      "createdAt": "2019-10-28T15:55:45.995Z"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "number": 0,
  "first": true,
  "last": true,
  "empty": false
}
```

#### **`GET /show/{id}`**
This fetches a show by its ID.
##### Path Variables
* `id` - the ID of the show.

##### Response
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "venue": "The Ryman",
  "artist": "The Strokes",
  "ticketUrl": "https://www.ticketweb.com/",
  "eventTime": "2019-11-01T00:00:00.000Z",
  "createdAt": "2019-10-28T15:55:45.995Z"
}
```

#### **`DELETE /show/{id}`**
This deletes a show by its ID.
##### Path Variables
* `id` - the ID of the show.

##### Response
_no response body_

#### Errors
In the event of an error, the API will return non-200 status codes
with an Error response body that looks like:
```json
{
  "timestamp": 1572278669,
  "status": 500,
  "error": "Internal Server Error",
  "exception": "com.foo.SomeException",
  "message": "Something Blew Up!"
}
```

## Exercise Bonuses
These are not required, but if you feel like doing some extra work:
* Automated tests
* Search/filters for the show list.

# Boilerplate Angular Info

# SingleUiShows

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
