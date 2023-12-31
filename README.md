# Tinder clone app (for Android only)

Tinder clone using [ReactNative] and [Typescript] on frontend, and [firebase] on backend(https://firebase.google.com/)

This project was created with followed commands npx react-native@latest init tinder-clone (React native CLI)

## Features

- Signup and Signin.
- Adding/modify user infos.
- Swipe on users card.
- See your crush
- Communicate with your crush by message.

## How to Run locally

No env variables needeed i put mines in order users can test app on android emulator/phone directly.

```bash
$ git clone https://github.com/Mathieu94110/tinderApp.git
$ cd until tinder-clone folder
$ npm install
```

Now run:

```bash
$ npm run android ( you need android studio installed and configured )
$ or
$ npm start and scan qr code ( you need expo installed )
```

## Screenshots

![login](assets/images/screenshot-login.png?raw=true 'LoginScreen')
![modal](assets/images/screenshot-update-profile.png?raw=true 'ModalScreen')
![home](assets/images/screenshot-profile-card.png?raw=true 'HomeScreen')
![match](assets/images/screenshot-match.png?raw=true 'MatchScreen')
![chat](assets/images/screenshot-chat.png?raw=true 'ChatScreen')
![message](assets/images/screenshot-message.png?raw=true 'MessageScreen')

**Warning:** Spotify Playback requires users to authenticate with spotify credentials.
