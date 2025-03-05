# Task2Go: a Simple React Native ask Manager App

## Overview

This is a basic Task Manager app built with React Native and Expo. The app allows users to:
- **Add Task:** Enter a new task with a brief description.
- **Edit Task:** Edit an existing task with updated title and brief description. 
- **Mark Task as Complete:** Tap on a task to toggle its completion state. Completed tasks are displayed with a strike-through.
- **Delete Task:** Remove tasks from the list.
- **Delete All Completed Tasks:** Delete all tasks marked as complete from the list.

Note this app does not use any external storage or advantage state management techniques. It demonstratively uses basic, local state and props manipulation. As such, stored tasks will not persist, and is used for educational demonstration purposes. 

## Get started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your computer.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally.
- A mobile device or emulator for testing.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### Reference

This app is built using the default "New React Native Project with Expo" template found here: [React Native Environment Setup (Quickstart)]https://reactnative.dev/docs/environment-setup?guide=quickstart 
The app still uses the default project's icons, fonts, and configurations for app icons and connection routing.


### Final Notes

- **Documentation:**  
  This README file explains how to set up and run the app, lists its features, and provides references to necessary tools and templates.
  
- **Usage:**  
  Replace `<repository_url>` and `<repository_folder>` with your actual repository URL and folder name when cloning the project.

