# Notes
Day 12: Implement tutorial learnings to create backend database and API
Day 11:
- Going to take a tutorial to build and connect to a custom API
https://www.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm

Day 10:
- update nav for log in and log out
    - Add log out functionality
    - Add state management through redux
        - https://www.youtube.com/watch?v=9jULHSe41ls
        - https://www.youtube.com/watch?v=udr2rx_B99w
    - Update backed to have an API to reference.  Breaking out code from individual functions and bringing further up in process.

- complete Create user functionality


Day 9: You are working on functionality after users are created, and users are logged in
- login function accepts any data
    - https://www.youtube.com/watch?v=Lb9Basl0StM
    - https://github.com/Eazy2Code/react-mysql-connection/tree/master/server
- login complete - now work on what to do with it

Day 7 / 8:
- Working with PlanetScale for database. Able to get basic calls
Plan:
- Create basic database calls and connect to frontend
    - https://www.youtube.com/watch?v=F53MPHqOmYI
    - starting with create account
    - reading to database but values are empty when added to database - added useEffect to account for the rerender when values are added to state
    - took out useEffect and added a clearForm()

- Create log in
    - not calling out wring password, form not reseting after submission
*future improvement add Bcrypt to password
- Deploy
- Review existing code and refactor


Day 6
- Start working on creating a back end with PlanetScale : 
    - https://www.youtube.com/watch?v=Q29l7P3E1hw
    - https://planetscale.com/docs/tutorials/connect-nodejs-app

    Start server by running node app.js

    wondering if it is worth diving into this, or keeping it simple and focusing more on API integration and user features?

    Clean up nav bar

    Started incorporating a news api to develop more styling with the data
Day 5:
- Continuing progress bar
- Style buttons
- Stop progress bar from going over 100%
- Incorporate view transitions: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
Day 4:
- Add link to demo account and create initial functionality here prior to working on registration
- Update Activity naming and file structure and add some styling so all components are visible
- update functionality and connections between activity list and input form
- Incorporate API
    Idea: pull inspirational quotes - add a link to wikipidea directing to the author
    - Learned something new to implement later: Use the standard [quotes] API call and store the results as a variable in your project. This will keep a cache of quotes that you can loop locally rather than calling the server each time you want to display a new quote. After a set interval (an hour or so), call the ZenQuotes API again to refresh your local app cache. Using this method will keep load times down and free up resources for others as your user base increases. In the event the API service is unavailable, you will still have an available data set in your app to pull from.
    Using https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373 for now
    
- style activity components
    - time duration
    - Progress bar


Day 3:
- Playing with Material UI with the nav bar and log in trying to match somewhat to Candidly
- Created a Finn Avatar
- Working on creating the home page
    - Add ReactRouter: https://www.freecodecamp.org/news/how-to-use-react-router-version-6/

    - complete initial styling for home and sign up pages.  created basic nav that needs to be updated as more pages and login functionality are created.
- Create connection for activities page
    - How do I set up the page so I can see it again? -> Create route to page, add to nav bar
    - Come back to: update nav to change based on login status and update style
    - Building to minimum viable product, noting the improvements, and coming back to when they are needed to for a feature I come to.
    - Things from candidly site to incorporate
        - transition up on scroll
        - How it works page 
- Request Demo: activity Input -> now adding material ui to existing code (previous creating code using Material UI)
    - load date pickers: https://mui.com/x/react-date-pickers/getting-started/


- add new tasks to local storage as a temp solution to keep things moving forward
- Create activities page
- stuck on updating progress with add and subtract -> removed functionality from Item for now.  using local storage to manage progress

Day 2:
going to use the boredAPI and create an app that will suggest activities to do when you can't decide.  You can chose a random event from the API, or add in your own ideas.
- Start ids from the API and add them to your rotation of lists
- Need a login account to hold data.  
- Goal for today: Create log in page that matches Candidly, but for "Boredly" 
- Second goal create a nav bar connecting the current page to the log in
- I have the hardest time picking names for folders, components, etc.. -> do other people have this problem?

Why is there no way to access the candidly main site from the login screen? -> Login opens in a new page...


Day 1:
create-react-app . --template typescript
Learned about React Hook Form
Start with a basic to-do list with additional fields
Expand list component - delete feature
    incorporate UUID
    restructure components and movement of props between components
    Change item into a class to incorporate methods for each added item -> not needed for add end delete
    complete delete function
Create an edit form
    Create a form to edit Activity name and target, and additional form to edit the progress
    Form Layout
        ActivityInputForm: Add activityName and targetTime (Submit)
        ActivityEditForm: Update activityName or targetTime (Save)
            How is it going to edit? find and edit the line item? => no - use class function to edit / update
            toggle function works for setting edit state on and off to show form
            edit function showing correctly in console
            Learn: can't use set on multiple inputs when building functions in classes
            complete
    AddSubtract
        went pretty fast
    Keep adding time after task is completed and keep running total
        Easy
    Play with Google Charts (npm install --save react-google-charts)
        https://www.react-google-charts.com/examples/pie-chart
    Regroup on strategy for App
        Save weekly update
        T

refactor notes:
Update variable names
group re-used components

Constant Reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
