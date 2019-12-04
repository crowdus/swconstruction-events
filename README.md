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

### a) Registration, Login, User Management Tests

#### i) Register a user by clicking the registration button. Try some bad inputs and see that they will be rejected. You can also click the back arrow to take you back to the main login page. Once you put in information that is accepted you will be prompted that a user has created and be asked to login.

#### ii) Logging in -- enter your username and password. Successfully doing so will take you to the main feed.

#### iii) Editing your profile -- from the main feed click "profile" and edit the information there. Note that changes persist after logging out. 

#### iv) Logging out -- Click the log out button to take you back to the login screen. 

### b) Event Tests

#### i) 

### c) Map Tests

### d) Tag Tests

#### i) Scrolling through the feed you see after log-in (and in any similar screens throughout the app including the Admin Events screen, the Going/Interested events screen, the search screen, the tag view, etc.) you will be able to click on tags which will take you to a specific feed showing all the events with a certain tag. 

#### ii) From here, you can click a button at the top of the page that says “follow.” It will display a pop-up saying that you followed the page. This will now show up more often in your feed, which is hard to test, admittedly, but definitely happens.

#### iii) After seeing this pop-up, you can use some combination of the back arrows/hamburger menu to get to the “tags following” screen. Here you will be able to see all the tags you are following. Clicking on one of them will take you back to the tag feed for it. Pressing the back arrow will take you to the main feed. 

#### iv) But also from the “tags following” screen you can click the unfollow button, which will remove the tag from your list. You will see it less again. 

#### v) All the changes you make throughout these steps will persist after log out, which encourage you to test as well!

## (5) Who did What
* Ross/Elizabeth: Feed view, navigation, tags
* Kenneth/Arthur: Database, Search
* Katherine/Jiayi: User related functionality
* Melanie/Lindsey: Event related functionality, map-view


## (7) Changes
