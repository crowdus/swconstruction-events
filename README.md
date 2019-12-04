# swconstruction-events

View this README in doc form here: https://docs.google.com/document/d/1hUOcEYu0ORwO3AS0v-t7LvTGwnLvvZce2tmxTg7gHqE/

## (1-2) Compiling, Running
In order to compile the project,
1. clone our git repository at https://github.com/ecrowdus/swconstruction-events.git,
```
git clone https://github.com/ecrowdus/swconstruction-events.git
cd ./swconstruction-events
```
2. cd into the 'hot' directory and then run npm install. This will download all of our dependencies
```
cd hot
npm install
```
3. From here there are a number of different ways you can run the code and tests.

Preferred Method:
```
npm start
```
This will open Metro Bundler in your browser. From here you have a variety of options to view the app. If you have xcode or adb already installed, you can run the app on an iOS simulator or on your android phone over adb. But we recommend installing the “Expo” app on the Google Play or App Store, which will allow you to scan the QR code that shows up on the Metro Bundler web page and run the app on your phone. See the document we linked for more details. 

## (3) Running unit tests:

1. clone repo and access directory

``` cd hot ```

2. Install dependencies

``` npm install ```

To Run:

``` npm test ```

## (4) Acceptance Tests

See the doc for more details! This is just a summary.

### a) Registration, Login, User Management Tests

#### i) Register a user by clicking the registration button. 
Try some bad inputs and see that they will be rejected. You can also click the back arrow to take you back to the main login page. Once you put in information that is accepted you will be prompted that a user has created and be asked to login.

#### ii) Logging in
Enter your username and password. Successfully doing so will take you to the main feed.

#### iii) Editing your profile
From the main feed click "profile" and edit the information there. Note that changes persist after logging out. 

#### iv) Logging out
Click the log out button to take you back to the login screen. 

#### v) Follow/Unfollow a user
From the user public profile screen (accessed through the event view or search) you can follow/unfollow users, which will show up in the "Users Following" nav item in the drawer navigator.

### b) Event Tests

#### i) View an event
Click one of the event cards on the main feed. This will take you to a page displaying its details.

#### ii) Change your status
Use the going/interested/declined buttons to change your status. Note that the changes persist when you change pages/log out.

#### iii) View events you are going to
Use the Going/Interested events screen in the drawer navigator to view events you have marked as going or interested.

#### iv) Change the hot level of an event
If you mark yourself as going and the event crosses a certain numeric threshold, the event card will change color to mark its increasing hotness. Look at our document for those specific thresholds.

#### v) Create an event
Click the create event screen in the drawer navigator to create an event. Try some bad inputs; they will not work. If you set yourself as "Admin" by entering your username you will be able to see this event in the Admin events screen in the drawer navigator. By entering existing or new tags your event will also be linked to those tags. View the event in the feed/search afterwards

### c) Map Tests
Scroll around the map, and flip through the cards on the bottom to explore events. Click one of them to take you to the appropriate event screen.

### d) Tag Tests

#### i) Tag View
Scrolling through the feed you see after log-in (and in any similar screens throughout the app including the Admin Events screen, the Going/Interested events screen, the search screen, the tag view, etc.) you will be able to click on tags which will take you to a specific feed showing all the events with a certain tag. 

#### ii) Follow a tag
From here, you can click a button at the top of the page that says “follow.” It will display a pop-up saying that you followed the page. This will now show up more often in your feed, which is hard to test, admittedly, but definitely happens.

#### iii) View Tags you follow
After seeing this pop-up, you can use some combination of the back arrows/hamburger menu to get to the “tags following” screen. Here you will be able to see all the tags you are following. Clicking on one of them will take you back to the tag feed for it. Pressing the back arrow will take you to the main feed. 

#### iv) Unfollow a tag
Also from the “tags following” screen you can click the unfollow button, which will remove the tag from your list. You will see it less again. 

#### v) All the changes you make throughout these steps will persist after log out, which we encourage you to test as well!

### e) Search

Search for an existing event, user, or tag, and click on results to follow/interact with those entities.

## (5) Who did What, Changes, and More Specific Functionality Details

More or less, this was the breakdown of labor. See the design review doc for more details on the features, the changes we made to them, and labour breakdown.

https://docs.google.com/document/d/1qLQc4piI1Fhwj53qcmOKRyCQ5pcnpsbZ0ulvBZ8rWPU/edit#heading=h.to3hu8f8c1et

* Ross/Elizabeth: Feed view, navigation, tags
* Kenneth/Arthur: Database, Search
* Katherine/Jiayi: User related functionality
* Melanie/Lindsey: Event related functionality, map-view
