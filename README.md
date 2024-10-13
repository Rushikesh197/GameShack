# GameShack - Game Store and Management Platform

**GameShack** is a comprehensive web-based platform developed using React and Django with PostgreSQL for game browsing, cart management, and user authentication. It provides a seamless user experience for browsing games, managing favorites, and securely purchasing video games. With a user-friendly interface and a robust backend, GameShack ensures a smooth gaming experience for enthusiasts and customers alike.

## Features

- **Game Browsing:** Explore a wide range of games with search and filtering options.
- **Cart Management:** Add and remove games from the cart, modify quantities, and proceed to checkout.
- **Favorites List:** Save your favorite games to access them quickly anytime.
- **User Authentication:** Secure login and signup for personalized experiences.
- **Interactive Media:** Game cover images and other media are efficiently handled and displayed.
- **Stable Version:** Both the frontend and backend are stable with minor bugs.

## Project Structure

- **Frontend (React):**
  - **CartPage.js:** Page for managing the cart, including adding/removing items.
  - **FavoritesPage.js:** Page for viewing and managing favorite games.
  - **LoginPage.js:** User login interface.
  - **SignupPage.js:** User signup interface for account creation.

- **Backend (Django):**
  - **gameshack:** Main Django project directory.
  - **games:** Handles game browsing functionality.
  - **media/game_covers:** Stores game cover images.
  - **store:** Backend logic related to managing the store.
  - **users:** Handles user-related features like authentication.
  - **generate_tokens.py:** Script for session management and token generation.
  - **gameshack.session.sql:** Stores session-related data for managing user sessions.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rushikesh197/GameShack.git
   ```

2. **Backend Setup (Django):**
   - Navigate to the project directory:
     ```bash
     cd GameShack
     ```
   - Set up a virtual environment and install dependencies:
     ```bash
     python3 -m venv env
     source env/bin/activate  # On Windows, use `env\Scripts\activate`
     pip install -r requirements.txt
     ```
   - Apply database migrations and run the server:
     ```bash
     python manage.py migrate
     python manage.py runserver
     ```

3. **Frontend Setup (React):**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install necessary dependencies and start the development server:
     ```bash
     npm install
     npm start
     ```

4. **Access the Application:**
   - Open a browser and navigate to `http://localhost:3000/` to access the frontend.
   - The backend can be accessed via `http://localhost:8000/`.

## Dependencies

- **Backend (Django):**
  - Python 3.x
  - PostgreSQL
  - Key packages (see `requirements.txt`):
    ```txt
    asgiref==3.8.1
    Django==5.0.4
    django-cors-headers==4.3.1
    django-filter==24.2
    djangorestframework==3.15.1
    pillow==10.3.0
    psycopg==3.1.18
    psycopg2==2.9.9
    sqlparse==0.5.0
    typing_extensions==4.11.0
    ```

- **Frontend (React):**
  - Node.js
  - React

## Contact

For any inquiries or support, feel free to reach out at **rushikeshgadewar@gmail.com**.
