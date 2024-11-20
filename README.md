# Tender_Hands
# Charity Donation Platform
This repository contains the backend code for a charity donation platform. It's built with Flask and uses various extensions for database management, API development, and authentication.

## Features

* **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens).
* **Charity Management:** 
    * Charities can apply, manage their profiles, and track donations.
    * Admins can approve/reject charity applications and feature charities.
* **Donation Processing:**  Handles donations, including recurring donations, with a focus on M-Pesa integration.
* **Impact Stories:**  Charities can share stories about their work and impact.
* **Beneficiary Management:** Charities can manage information about their beneficiaries.
* **Inventory Tracking:** Basic inventory management for charities to track donated goods.
* **Admin Dashboard:** Provides an overview of platform data and tools for managing users and charities.
* **API Documentation:**  (To be added) Clear documentation for all API endpoints.

## Technologies Used

* **Flask:** Python web framework.
* **SQLAlchemy:**  ORM for database interaction.
* **Flask-Migrate:**  Database migrations.
* **Marshmallow:**  Object serialization/deserialization.
* **Flask-JWT-Extended:**  JWT authentication.
* **Flask-CORS:**  Cross-Origin Resource Sharing.

## Project Structure

/Tender_Hands/
|-- frontend
│   |-- Tender_Hands
│       |-- public
│       │   |-- index.html
│       │   |-- vite.svg
│       |-- src
│       │   |-- components
│       │   │   |-- AdminDashboard.jsx
│       │   │   |-- CharityApplication.jsx
│       │   │   |-- CharityDashboard.jsx
│       │   │   |-- CheckoutForm.jsx
│       │   │   |-- DonateForm.jsx
│       │   │   |-- DonationHistory.jsx
│       │   │   |-- DonationList.jsx
│       │   │   |-- Navbar.jsx
│       │   |-- pages
│       │   │   |-- CharityDetailPage.jsx
│       │   │   |-- ContactPage.jsx
│       │   │   |-- DonatePage.jsx
│       │   │   |-- HomePage.jsx
│       │   │   |-- RegisterPage.jsx
│       │   │   |-- LoginPage.jsx
│       │   │   |-- SignupPage.jsx
│       │   |-- redux
│       │   │   |-- authSlice.jsx
│       │   │   |-- donationSlice.jsx
│       │   │   |-- charitySlice.jsx
│       │   │   |-- store.jsx
│       │   │   |-- storySlice.jsx
│       │   |-- services
│       │   │   |-- api.js
│       │   │   |-- charityService.js
│       │   │   |-- donationService.js
│       │   │   |-- userService.js
│       │   │   |-- storySlice.js
│       │   |-- App.css
│       │   |-- App.jsx
│       │   |-- main.jsx
│       │   |-- index.css
│       |-- ...
|-- backend
│   |-- venv
│   │   |-- ...
│   |-- pycache
│   │   |-- ...
│   |-- app 
│   │   |-- init.py
│   │   |-- routes
│   │   │   |-- auth.py
│   │   │   |-- charity.py
│   │   │   |-- donation.py
│   │   │   |-- story.py
│   │   │   |-- user.py
│   │   │   |-- admin.py
│   │   |-- schemas
│   │   │   |-- beneficiary.py
│   │   │   |-- charity.py
│   │   │   |-- donation.py
│   │   │   |-- inventory.py
│   │   │   |-- story.py
│   │   │   |-- user.py
│   │   |-- services
│   │   │   |-- admin_service.py
│   │   │   |-- charity_admin_service.py
│   │   |-- models
│   │   │   |-- beneficiary.py
│   │   │   |-- charity.py
│   │   │   |-- donation.py
│   │   │   |-- story.py
│   │   │   |-- user.py
│   │   |-- utils
│   │       |-- decorators.py
│   |-- config
│   │   |-- init.py
│   |-- models
│   │   |-- init.py
│   │   |-- beneficiary.py
│   │   |-- charity.py
│   │   |-- donation.py
│   │   |-- story.py
│   │   |-- user.py
│   |-- routes
│   │   |-- init.py
│   |-- schemas
│   │   |-- init.py
│   │   |-- beneficiary.py
│   │   |-- charity.py
│   │   |-- donation.py
│   │   |-- inventory.py
│   │   |-- story.py
│   │   |-- story.pyma.schema
│   │   |-- user.py
│   |-- services
│       |-- pycache
│       |-- admin_service.py
│       |-- charity_admin_service.py
│       |-- charity_service.py
│       |-- donation_service.py
│       |-- user_service.py
│   |-- app.py
│   |-- database.py
│   |-- requirements.txt
|-- package.json
|-- README.md
|-- package-lock.json

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development   
 and testing purposes.

### Prerequisites

* **Node.js and npm:** Make sure you have Node.js and   
 npm installed on your system.
* **Python and pip:**  Ensure you have Python and pip installed.
* **Virtual environment:** Use a virtual environment for the backend.
* **Database:**  Set up a database e.g., PostgreSQL, MySQL

### Installing

1. **Clone the repository:**
git clone...

2. Backend Setup:

Navigate to the backend directory:
Bash
cd /home/raymond/Tender_Hands/backend

Create and activate a virtual environment:
Bash
python3 -m venv venv
source venv/bin/activate

Install backend dependencies:
Bash
pip install -r requirements.txt

Set up environment variables in a .env file (see the backend README for details).
Run database migrations:
Bash
flask db init
flask db migrate
flask db upgrade

3. Frontend setup
Navigate to the frontend
Install frontend dependencies:
Bash
npm install 

4. Running the Application
Start the backend server
Bash
flask run

Start the frontend development server:

Bash
npm run dev

5. Built With:
Flask - The web framework used
React - Frontend library
Redux - State management library

6. contributors
Gadiye Kirimi - https://github.com/Gadiye
Joanne Mbula - https://github.com/lowkey-joanne
Arnold Karoki - https://github.com/arnoldkaroki
Steve Mutwiri - https://github.com/stevedev-ops
Raymond Muthii - https://github.com/raymuthii
June Jepkurui -https://github.com/June-Jepkurui-png