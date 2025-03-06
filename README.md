# RescueNet

RescueNet is a mobile application designed to assist in disaster response by deploying volunteers to areas in need and ensuring efficient aid delivery. It optimizes decision-making and resource allocation through incident analysis and provides real-time alerts and community feedback for effective crisis management.

## Project Structure



## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/RescueNet.git
    cd RescueNet
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up Firebase:
    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Add an Android app to your Firebase project and follow the instructions to download the `google-services.json` file.
    - Place the `google-services.json` file in the `android/app` directory.

4. Configure environment variables:
    - Create a `.env` file in the root directory and add the necessary environment variables. Example:
    ```
    API_KEY=your_api_key
    AUTH_DOMAIN=your_auth_domain
    PROJECT_ID=your_project_id
    STORAGE_BUCKET=your_storage_bucket
    MESSAGING_SENDER_ID=your_messaging_sender_id
    APP_ID=your_app_id
    MEASUREMENT_ID=your_measurement_id
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm start
    ```

2. Open the Expo app on your mobile device and scan the QR code to run the application.

## Project Structure Details

### Screens

- `About.js`: Displays information about the RescueNet application.
- `RescueRequests.js`: Manages rescue requests and allows volunteers to accept them.
- `Survey.js`: Collects user feedback on the application's usability and satisfaction.
- `UserStatus.js`: Displays the status of rescue requests made by the user.
- `VolunteerStatus.js`: Displays the status of rescue requests accepted by the volunteer.

### Firebase

- `firebase.js`: Initializes Firebase and exports the necessary Firebase services.

## License

This project is licensed under the MIT License.