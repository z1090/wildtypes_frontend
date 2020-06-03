# Welcome to WildTypes

WildTypes is a public archive of outdoor typography, referenced by typeface, format and industry. Contributions are added by members of the public, with the goal of improving typographic literacy and appreciation. Designers use our app for project research, type selection and pairing, and discovering new ways to choose and use fonts.

It's a data collection app for outdoor typography usage. The Backend is using Express, Mongo and Mongoose, and the frontend is Ionic/Angular. I've included the actual database in the backend repo, which I know is a bit weird, but it seemed a simple way to include it with the rest of the project.

## Database Setup
To connect to to the DB, you'll need to download mongo and then edit the mongo script in the package.json file. The first path should point to mongo itself, the path after '--dbpath=' should point to wherever you've cloned the repo to.

## Frontend
For the Front end, there is a mock authorisation system. Adding a real one seemed a bit OTT for a demo project! The email and password aren't wired up to do anything but are required to enable to Sign Up button. The username is used to list 'your contributions' and is saved along with a new submission. If you use the menu to log out, the login screen will have remembered the username. The login screen just bypasses the welcome screen.

## Running the project
In the backend project Use `npm run mongo` to fire up the DB, then in a new terminal `npm start` to start the server. In the frontend project, run `ionic serve`.

As this is an Ionic app, to get the 'app experience' turn on device emulation in the browser's dev tools and reload the page. However, the site does look fine in normal viewing mode.

I think everything else should be fairly self-explanatory.

## Project Planning
I created a rough flow-diagram/sitemap first (in the `project-planning` folder if you're interested), and then created some mockups in Figma ( https://www.figma.com/file/9V1HY3vGjQsOfzE3Tz5mhk/WildTypes?node-id=1%3A2 ) and then worked from those. To 'manage' the project I used ClickUp (like a fancier version of Trello).

## Links
Backend: https://github.com/z1090/wildtypes_backend

Frontend: https://github.com/z1090/wildtypes_frontend