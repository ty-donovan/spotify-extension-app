# Spots: Spotify Extension App

## Project Description

Spots is a web application created for Spotify users to come together and talk all things music. Instead of having to go to other websites like reddit or twitter to discuss music, now you can use Spots instead. After connecting your spotify account and creating a user profile you can display your music taste and find other like-minded fans. Visiting the forum allows you to start a discussion board post and chat with all the fellow users. If you want to keep it one-on-one then you can privately DM another user to keep it quiet.

Spots uses:

- Javascript for the code base
- React for the frontend development
- Express for the backend development
- Firebase as the database
- MUI for styling alongside basic HTML/CSS

This tech stack was used as practice and to help learn more about how each of those components work. The main challenges that occurred was dealing with the Spotify API authentication as well as integrating all the features together.

## Table of Contents

- Installation
- How to Use Project
- Major Components and Features
- The Status of those Features
- Credits

## Installation

Currently in developer mode. For use you will have to head to the spotify for developers dashboard and connect your spotify account.

1. Go to https://developer.spotify.com/ and connect your spotify account
2. Create an app and name it whatever you want. Set the redirect URI to http://localhost:3000
3. Once you create the app go into your app and click setting
4. Copy your client ID and your client secret you get the client secret by clicking the small “View client secret” link right below the client ID
5. Clone the repository and cd into the frontend folder and npm i (to install packages) and repeat this with the backend folder
6. Now create a .env file in to root of the backend folder and paste your client id and client secret in the following format format
   i. client_id=”your client id here”
   ii. secret=”your client secret here”
7. Now save those files and restart your code editor (just incase there a issues with the editor and .env file saving properly)

Currently, there is no public Firestore database for use with Spots. You will have to create your own.

1. Go to firebase.google.com and create a new project.
2. Under all products add Firestore database to your project.
3. On your Firestore database, set the database to test mode.
4. Create three collections in the database: one titled “chats”, one titled “users”, and one titled “discussionBoard”. You won’t need to create any documents in the “chats” or the “discussionBoard” collections for functionality to work.
5. Create at least one document in the “users” collection that has two fields: “username” and “password”.
6. Go to the Firebase project settings, and under service accounts, generate a new private key.
7. Move the downloaded file into the “backend” folder in the Spots project files. Rename this file to “permissions.json”.

Having done the above, most functionality will work with Spots. If you would like to set up dynamic user profile pictures, additional steps need to be taken.

1. From the Firebase project dashboard, go to all products and add storage to your project.
2. Create a folder in storage titled “profilePictures”.
3. From the project overview tab of the Firebase dashboard, add a new web app to your project. The title of this is irrelevant.
4. From the settings page for the added web app, scroll to the “sdk setup and configuration setting” and copy the line that will look like this:
   i. storageBucket: "your-project.appspot.com"
5. Paste this line into “permissions.json” from before.
   All functionality with Spots should now be set up.

## How To Use:

**Start Up**

1. cd into the frontend folder and npm start
2. cd into the backend folder and npm start
3. Your will be automatically redirected to the spotify authentication, sign in and allow access
4. Now sign in to spots

**Top songs, artists, and liked songs**

1. On the home screen you can navigate to your profile in the top left menu
2. If you want to see your top artists, songs, and liked songs, click on the “your tastes” link in the navbar on the left
3. You will be redirected to a page with 3 pathways for each respective element, just click on whatever one you please and you’ll be able to see your relevant information.
4. To change the time period of items being displayed (only applicable to top artists and songs) in the top right below the navbar there should be toggle for durations for 1 month, 6 months, and 12 months +. Click on whatever you want and the information should change accordingly

**Forums**

1. On the home screen navigate to “forum” in the navbar on the left
2. Here you can create a forum post by clicking on “create post” and typing in your message in the text field and hitting submit
3. Your post should show up in the forums below
4. To see how people have responded to a particular post you can click on the forum message and you will be redirected to that specific forum
5. Here you can use the same process as the forum post to post a message replying to the forum

## Major Components/Features

1. Spots has a user login feature that requires a user account in order to access the other features.
2. The discover page allows you to search for other users in the Firestore database that have their profiles set to public.
3. On the your tastes page you can view your Spotify statistics.
4. From the forum page you can create text threads that will be visible to all users registered in the database.
5. On the profile page you can view and edit information about your Spots profile such as profile picture, bio, and display name
6. On the inbox page you can send direct messages to other users in the Firestore database.

## Status of Features

- [x] Spotify Integration: Connects to your Spotify account to access and share your music taste
- [x] User Profiles: Personalize your profile and share your favorite artists and songs
- [x] Discover Page: Search for other uses who have set their profiles to public. Get connected with the larger community!
- [x] Your Taste: A special page dedicated to your Spotify statistics. Keep track of your music habits and discover what defines your musical personality.
- [x] Discussion Forum: Start or join discussions about your favorite music topics
- [] Direct Messaging: Reach out directly to other users for private conversations.

As for now, all major features except direct messaging are functional. We are continuously working to improve user experience and add new features.

## Credits

- Nolan Hill: [Github](https://github.com/NolanReedHill), [Linkedin](http://www.linkedin.com/in/nolan-hill-b980981b1)
- Tyler Donovan: [Github](https://github.com/ty-donovan), [Linkedin](https://www.linkedin.com/in/donovantylert/)
- Marina Lin: [Github](https://github.com/Lamarina0612), [Linkedin](https://www.linkedin.com/in/shuojia-lin-4719801b9/)
- Dio Suliman: [Github](https://github.com/DecentDio), [Linkedin](https://www.linkedin.com/in/dio-suliman-742190239/)
