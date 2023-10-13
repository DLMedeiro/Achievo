# Start Somewhere test

__A unique approach to goal achievement.__

View application at: https://startsomewhere.onrender.com/

This application shifts the focus from simply reaching the finish line to valuing the time invested in attaining your goals. With this app, users have the ability to create goals within a defined timeline, where they specify the amount of time required to achieve each goal. Allowing them to appreciate the commitment and effort invested in achieving their goals rather than solely focusing on the end result. Motivating users to make the most of their time, fostering a sense of accomplishment and personal growth along the way.

__Example:__

If a user who wants to improve their fitness. They can create a goal stating their intention to dedicate 30 hours of effort over the next month to reach their fitness objective. The application actively monitors the progress towards this goal while also tracking the remaining time until the completion date.


## Technical Information
- Frontend built with __React__ and __Typescript__
- Backend built with __Node__ and __Express__
- Data managed through __MongoDB__ and __Mongoose__
- Insomnia used to test out and debug API connections and responses
- __Mongo DB Compass__ used to test out database connections and available values
- State management completed through __Redux__

## Learnings
### Further learning with React, Redux, and the incorporation of a NoSQL database
- https://www.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm
### React-hook-form with Zod and Material UI's Date picker
- Purpose: provides validation of data prior to interacting with the database
- https://dev.to/majiedo/using-zod-with-react-hook-form-using-typescript-1mgk 
### Redux
- https://www.youtube.com/watch?v=9jULHSe41ls
- https://www.youtube.com/watch?v=udr2rx_B99w
### Troubleshooting issues with authorization functionality
- https://www.youtube.com/watch?v=Lb9Basl0StM
- https://github.com/Eazy2Code/react-mysql-connection/tree/master/server
### Utilized NPM Scripts to streamline the development workflow by defining various automation commands
- __"start"__ and __"server"__ scripts to launch the server using TypeScript and ESM (ECMAScript Modules) through __ts-node-esm__.
- __"client"__ script to start the frontend application by delegating to __"npm start"__ within the __"frontend"__ directory.
- __"dev"__ script utilizing concurrently to concurrently run the server and client using __"npm run server"__ and __"npm run client"__.
- __"test"__ script to initiate testing of the React application using react-scripts.
- __"eject"__ script to eject from react-scripts configuration.
- __"renderStart"__ script for installing dependencies within the "frontend" directory and starting the application.
### Typescript
### Material UI


## Enhancements
### Testing and Error Handling
- Incorporate frontend testing
- Create user-friendly messages for any errors
- Incorporate backend testing

### Styling and Features
- Loading Icons
- Increment options to goals
- Mobile and desktop designs
- Additional loads between pages (refactor code)

### Refactor Code
- Repetitive code
- Create a Color Pallet to streamline future updates
- Clean notes an remove unused code

