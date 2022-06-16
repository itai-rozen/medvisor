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
nodemailer - a library for sending custom emails.
node-cron - a library for creating cron jobs (so i can send reminders based on user preferences)puppeteer - to scrape MOH drug database.
auth0 - authenticate users.
jsonwebtoken - jwt authentication.
mui - UI tools for react.

### captain's log 2.2.2022
After several tries getting israely medication database from the Ministry of health, "Clalit" health
organizations and more, I have decided not to compromise for the non-user frindly rxnav API.
Though it is a very thorough database, I want my database to have israely commercial medicine
names. Also I decided my app would be in hebrew and i need medication names also to be hebrew-suppoerted. I decided to try scraping MOH database.
...
success!! after long trial & error i made it. Encoutered several challenges:
 
 - couldnt grab search text input field. The selector was accurate but puppeteer always returned null.
 #### solution: forced puppeteer to wait until page fully loads by using both "waitUntil" command
 #### and "page.waitforselector" with the input's selector (not sure i needed to use both, but it works).
 - couldnt grab results container selector even though I used the solution above.
 #### solution: used the command waitForNetworkIdle(page,500,0) which make the browser wait until all results are fully loaded. Found this using the "screenshot" super-awsome function that takes a screenshot of the browser at a given moment. After doing this i saw a screenshot of the site's spinner, which made me realise the selector-grabbing function is invoked before page fully loads.
 - result spans over 480 pages :O
 #### solution: found an element with number of results on the page, grabbed its text content, distilled the number of results from it, divideed by 10 (#results per page) and created a loop that scrapes page's result -> click on the "next page" button -> add a comma before next page's result are scraped (so the json file that the data is scraped to would run appropriately)
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

### captain's log 9.2.22
dear diary,
ok, medicine list is functional! for both subsribed user & unsubscribed (the difference is the first's data will be stored in mongo and the second will disappear on refresh). still looks awfull but it works! had to struggle a bit with adding and removing from nested array in a mongoose Schema.
I added the reminder component, and its been harder than i imagined. There are a lot of things i needed to take into account.
Also i changed the structure of the schema and now there are two separate schemas for users & reminders. I figured it has more logic to put all reminders in one schema and filter them to the user via user email. In that way, when i'll set up the scheduled email functions it will have only one place to look scheduled info from;

### captain's log 10.2.22
Ok so everything seems to be working, but its still ugly af. gonna spend some serious time making it look decent. Also, im very excited because its 7:00pm and thats the time i set to get an Email reminder on medicines..AND IT WORKED!!! was really doubtful Oh wait a minute.. it sends me the email every minute LoL. I guess I scheduled it to send it to me at 7pm but at EVERY MINUTE of 7pm. Needs tweaking.
