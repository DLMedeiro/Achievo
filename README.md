# Notes
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
        NO => AddSubtractForm: Add or subtract from progress (+ / -)
            YES => Stand Alone Buttons

Update variable names after getting to a stopping point with the edit form

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
