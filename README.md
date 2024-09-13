# Mythelix
###### Live at [mythelix.com](https://mythelix.com/Guest)

Mythelix is intended to be a card game where every card is unique. This can be done by using a image generation model with unique prompts to create the images. 
![image](https://github.com/user-attachments/assets/a247d571-3fe3-47af-82d8-50defcde85fa)

This repo contains the public facing website for the game allowing users to view their collection and create cards.

Here are the other repositories linked to this project:
 - [Admin Client](https://github.com/Morgs27/mythelix-admin-client)
 - [Image Generator](https://github.com/Morgs27/mythelix-image-generator)
 - [Admin Server](https://github.com/Morgs27/mythelix-admin-server)

## Features

- AI-generated card artwork
- Card collection management
- Card creation system
- User authentication (including guest accounts)
- Responsive design for various screen sizes

## Technologies Used

- Next.js
- React
- TypeScript
- SCSS
- MongoDB
- NextAuth.js

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see `.env`)
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js app directory
- `/public`: Static assets
- `/app/_components`: Reusable React components
- `/app/_hooks`: Custom React hooks
- `/app/_mongoDB`: MongoDB models and utilities

## Next Steps
- Add a marketplace for users to sell cards
- Improve the home page to give more context about the app
- Add a deck creation feature
