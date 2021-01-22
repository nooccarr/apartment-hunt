# Apartment Hunt

## Overview

Redesign Apartment Hunt’s current website utilizing modern technologies. Main implementations include search functionality, user authentication, secure document upload, virtual tour, photo & video upload, and live chat.

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
### Authentication
A login page provides several options to login and signup for the user and Admin. Once logged in, the user is given access to only the private profile and public routes, and the admin has access to the agent portal.

![Login Feature](readme_assets/auth.gif)

### Search Apartments
The searching feature allows the user to filter apartments based on many options. Once the user selects an apartment from search results, the additional details about the neighborhood, crime, schools, and dining are shown.

![Search Apartments Feature](readme_assets/search-apt.gif)

### Live Chat
The live chat lets the user communicate with an agent representing a given property and have all inquiries and message histories in the messages dropdown menu. The agent portal contains all the client communication and the agent responds to client inquiries through the live chat feature.

![Live Chat Feature](readme_assets/live-chat.gif)

## Secure Document Upload
The secure upload enables the user to securely upload documents to streamline the application process. The admin is able to securely view documents posted by my client to provide client feedback on whether they will get accepted or denied.

![Secure Document Upload Feature](readme_assets/secure-document-upload.gif)

## Upload Listing
The agent portal contains an upload listing page. Agents have the ability to list new apartments on Apartment Hunt’s website for users to view.

![Upload New Listing Feature](readme_assets/upload-listing.gif)