# Kannada Speaking App

A React Native application for learning and practicing Kannada speaking skills.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Java Development Kit (JDK) 11 or 17
- Android Studio (for Android development)

## Android Setup

To create the Android folder in your React Native project, you can use one of the following commands:

```bash
npx react-native eject
```

Or, if you're using React Native 0.60.0 or later:

```bash
npx react-native init MyApp --template react-native-template-typescript
```

If you already have a React Native project set up, you can try:

```bash
npx react-native upgrade
```
This will create the necessary Android folder if it's missing.
- Xcode (for iOS development, macOS only)
- Expo CLI (`npm install -g expo-cli`)

### Java Setup

1. **Check Java Version**
   ```bash
   java -version
   ```
   - Should show Java 11 or 17

2. **Install Java (if needed)**
   - **macOS (using Homebrew)**:
     ```bash
     brew install openjdk@17
     ```
   - **Windows/Linux**: Download from [Adoptium](https://adoptium.net/)

3. **Set JAVA_HOME**
   - **macOS**:
     ```bash
     echo 'export JAVA_HOME=/usr/local/opt/openjdk@17' >> ~/.zshrc
     source ~/.zshrc
     ```
   - **Windows**: Set environment variable `JAVA_HOME` to your JDK path

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kannadaspeakingapp.git
   cd kannadaspeakingapp
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```
   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator
   - Press `w` to open in web browser

## Building the App

### For Local Development (APK)

1. **Generate Android files**
   ```bash
   npx expo prebuild
   ```

2. **Build Debug APK**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```
   - APK Location: `android/app/build/outputs/apk/debug/app-debug.apk`

3. **Build Release APK**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleRelease
   ```
   - APK Location: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### For Production (AAB)

Using EAS Build (recommended):
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile production
```

## Troubleshooting

### Common Issues

1. **Java Version Mismatch**
   ```bash
   # Check Java version
   java -version
   
   # If using multiple Java versions, set JAVA_HOME
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)  # For Java 17
   ```

2. **Gradle Build Fails**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew --stop
   ./gradlew assembleDebug --stacktrace
   ```

3. **Missing Dependencies**
   ```bash
   npx expo install
   ```

4. **Clear Cache**
   ```bash
   npx expo start -c
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```
   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator
   - Press `w` to open in web browser

## Building the App

### For Development (APK)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to your Expo account**
   ```bash
   eas login
   ```

3. **Build the APK**
   ```bash
   eas build:configure
   eas build -p android --profile preview
   ```

4. **Download the APK**
   - After the build completes, you'll receive a download link
   - The APK will also be available in your [Expo Dashboard](https://expo.dev/accounts/yourusername/projects/kannadaspeakingapp/builds)

### For Production (AAB)

```bash
eas build -p android --profile production
```

## Troubleshooting

### Common Issues

1. **Missing Dependencies**
   ```bash
   npx expo install
   ```

2. **Clear Cache**
   ```bash
   npx expo start -c
   ```

3. **Reset Project**
   ```bash
   rm -rf node_modules
   npm install
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

A cross-platform mobile application built with React Native and Expo that helps users learn and practice the Kannada language. The app works on Android, iOS, and web platforms.

## Features

- Learn basic Kannada phrases and vocabulary
- Practice speaking with voice recognition
- Interactive lessons and quizzes
- Works on Android, iOS, and web

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kannadaspeakingapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

## Running the App

### Android
- Connect an Android device or start an emulator
- Run `npm run android` or scan the QR code with the Expo Go app

### iOS
- Requires a Mac with Xcode installed
- Run `npm run ios` or scan the QR code with the Expo Go app

### Web
- Run `npm run web`
- Open your browser to `http://localhost:19006`

## Project Structure

- `/screens` - Contains all the app screens
- `/components` - Reusable UI components
- `/assets` - Images, fonts, and other static files
- `/navigation` - Navigation configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
