# MedVisor v 1.0.0
This app will help you organize and handle your daily medical treatment. sign in and fill out
your digital container with your daily meds by your regime and get notified via text message
when you need to take them! also find out if there are any drug-drug interaction that might
harm you over time (so you might ask your doctor about them and under no circumstance stop your
treatment on your own choice).

Api used: 
medicine list: https://rxnav.nlm.nih.gov/REST/allstatus.json?status=Active
drug-drug interactions: https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=207106+152923+656659

libraries:
Twillo - communication api
auth0 - authenticate users
jsonwebtoken - jwt authentication

### captain's log 2.2.2022
After several tries getting israely medication database from the Ministry of health, "Clalit" health
organizations and more, I have decided not to compromise for the non-user frindly rxnav API.
Though it is a very thorough database, I want my database to have israely commercial medicine
names. Also I decided my app would be in hebrew and i need medication names also to be hebrew-suppoerted. I decided to try scraping MOH database.
...
success!! after long trial & error i made it. Encoutered several challenges:
 
 - couldnt grab search text input field. The selector was accurate but puppeteer always returned null.
 # solution: forced puppeteer to wait until page fully loads by using both "waitUntil" command
 # and "page.waitforselector" with the input's selector (not sure i needed to use both, but it works).
 - couldnt grab results container selector even though I used the solution above.
 # solution: used the command waitForNetworkIdle(page,500,0) which make the browser wait until all results are fully loaded. Found this using the "screenshot" super-awsome function that takes a screenshot of the browser at a given moment. After doing this i saw a screenshot of the site's spinner, which made me realise the selector-grabbing function is invoked before page fully loads.
 - result spans over 480 pages :O
 # solution: found an element with number of results on the page, grabbed its text content, distilled the number of results from it, divideed by 10 (#results per page) and created a loop that scrapes page's result -> click on the "next page" button -> add a comma before next page's result are scraped (so the json file that the data is scraped to would run appropriately)
still need to improve the active ingredient property. sometimes the ingredient contains 2 words and the scraper scrape out only one. it might cause troubles when i'll fetch drug interaction & indications in the future. will fix it over the next few days. Now i need to keep doing other stuff!

 ive looked for a library that sends sms\whatsapp messages for clients. heard good things about twillo. After further research encountered "messageBird" that gives you unlimited text messages for 50 clients! will try it out tomorrow.

 ### captain's log 3.2.2022
 It's almost 6pm and i havent done much work. Decided to deploy the project to github & heroku
 before it starts.
 ...
 made it! needed to add "start" script to the server package json and fix some more bugs in client's components. For now it is deployed with no issues (tfoo tfoo tfoo)

 ### captain's log 6.2.22
 It's been a horrible waste of time trying to get a free SMS sending package. after a lot of trial & error ive decided to let it go. Spent some more time trying to implement push notification then decided it would be some more waste of time. Right now focusing on medicine forms for users. If i'll have some spare time will do authentication :(:(:(
 ...
 ok I made a form for adding a drug. its been challenging making an autocomplete input using material ui because my database has initial 9000+ options (after filtering only unique results :O ). now
 im gonna add an option to set a reminder for when the user wants to get notified. Also i bumped into a library that lets you pick multiple dates.. it could be awsome for people who dont have a regular regime (birth-control pills for example). Will try to play with it into the night. Also I responded to a guy who also got stuck on scraping the MOH database and Ive earned me some points & badges! made me feel like a contributing member B). 

### captain's log 8.2.22
made a lot of AUTH today. implemented bcrypt & jwt. jwt has not yet been completely implemented but for now its sufficient. thought a lot about what is the best way to add reminders to the user's medicine array. At first i thought every med should have its own reminder set, then I decided it should be managed only at the drug list page and should gather the relevant meds to a whole reminder.
found a great library to schedule email sending on time increments called CRON.

if something goes wrong i should look at:
the patient model,
the addDrug components, specificaly on the handleSubmit func
backend for the /addDrug route
drug & reminder controller, route

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
