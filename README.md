# RescueNet

RescueNet is a mobile app created to improve disaster response by efficiently coordinating volunteers and resources. It helps manage emergencies by providing real-time alerts, streamlining volunteer deployment, and enabling effective decision-making through incident analysis and community feedback.

RescueNet features both user and volunteer interfaces to address disaster and emergency response needs. The volunteer dashboard ensures real-time updates, while key sections such as Emergency Contacts, Shelter Site Information, and Disaster Information allow users to filter contact details, access offline data, and track disaster-related measures. The project utilizes Firebase for database management.

## Project Structure
- **Frontend**: Built using React Native and Expo.<br>
- **Backend**: Node.js and Firebase for real-time database and authentication.

## Key Features:
- Volunteer Deployment and Request Management.<br>
- Effective Rescue Request Management.<br>
- Real-time Emergency Alerts.<br>
- Offline access to essential disaster information and measures history saved.<br>
- Offline Shelter site and Emergency contact information filtering and direct call options.<br>
- Food, Funding, and Apparel Donations Tracking.<br>
- All Donation History and Transaction History Storage.<br>

## Getting Started

### Prerequisites
Before running the application, ensure you have the following installed:
- Node.js (Latest stable version recommended)<br>
- npm or yarn (for package management)<br>
- Expo Go App (A mobile app available in Play Store)<br>

### Installation

1. **Clone the Repository:**
   Open a new project-folder (where the project will be cloned) and right-click to open that in the terminal. Then, run:<br>

   ```bash
   git clone https://github.com/Hasucat/RescueNet.git
   ```

   To open the project in the VScode editor, run in that same terminal:

   ```bash
    code .
   ```

3. **Install dependencies:**
    When the project-folder is open with code in preferred editor, right-click to got to editor's integrated terminal and run:<br>

    ```bash
    yarn add expo
    ```

### Running the Application

1. Ensure that your computer and mobile device are connected to the same network (WiFi or internet). Then,
   
   **Start the Development Server:**

   Run the following command in the integrated terminal:

   ```bash
    npx expo start
   ```

3. A QR code will be generated. Press **'s'** to make it scannable via the Expo Go app.
4. **Run the Application on Mobile:**

    1. Open the Expo Go app on your mobile device.<br>
    2. Scan the QR code displayed in your terminal.<br>
    3. Select "Expo Go" when prompted.<br>
    
   The project will start building and launch on your device.
