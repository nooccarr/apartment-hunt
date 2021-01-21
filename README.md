# Apartment Hunt

## Overview
Redesign Apartment Hunt’s current website utilizing modern technologies.

## Goals
1. Allow users to search for an apartment and filter by certain parameters.
2. Allow agents to answer user questions.
3. Allow for secure document uploads.
4. Allow for agents to add listings.
5. Allow agents to upload virtual tour of apartments.

## Styling Requirement
<span style="font-family:'Comic Sans MS', 'Comic Sans', cursive">Comic Sans</span> will be the default website font.
<span style="color:pink">Pink</span> will be the primary color of the website.

## Wireframes and Documentation
* [Business Requirement Document](readme_assets/brd.pdf)
* [Website Wireframes](readme_assets/wireframe.pdf)

## Scripts
npm start: Run this to start server running on port 3000. BE ADVISED - this command __does not__ run nodemon!
npm run build: Run this script to compile webpack running in watch mode.
npm test: Run this script to run __all__ test. Jest automatically looks for files with 'compenent'.test.js formating

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

![Login Feature](readme_assets/login.gif)

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