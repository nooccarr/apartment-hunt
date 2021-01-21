# Apartment Hunt

## Overview

Redesign Apartment Hunt’s current website utilizing modern technologies.

![Apartment Hunt Overview Demo](readme_assets/overview.gif)

## Goals

1. Allow users to search for an apartment and filter by certain parameters.
2. Allow agents to answer user questions.
3. Allow for secure document uploads.
4. Allow for agents to add listings.
5. Allow agents to upload virtual tour of apartments.

## Wireframes and Documentation

* [Business Requirement Document](readme_assets/brd.pdf)
* [Website Wireframes](readme_assets/wireframe.pdf)

## Building and Running Environment

First install dependencies:

```sh
npm install
```

To create a development build:

```sh
npm run build-dev
```

To create a production build:

```sh
npm run build-prod
```

To run socket server:

```sh
npm run start-sock
```

To run node server:

```sh
npm start
```

## Tech Stack
* [React](https://reactjs.org)
* [Node](https://nodejs.org/en)
* [Express](https://expressjs.com)
* [MongoDB](https://www.mongodb.com/)
* [Socket](https://socket.io/)
* [Passport](http://www.passportjs.org/)
* [AWS](https://aws.amazon.com)

## Features
### Auth
The login feature

![Login Feature](readme_assets/auth.gif)

### Search Apartments
The searching feature

![Search Apartments Feature](readme_assets/search-apt.gif)

### Live Chat
The live chat feature

![Live Chat Feature](readme_assets/live-chat.gif)

## Secure Document Upload
The secure upload feature

![Secure Document Upload Feature](readme_assets/secure-document-upload.gif)

## Upload Listing
The upload new listing feature

![Upload New Listing Feature](readme_assets/upload-listing.gif)