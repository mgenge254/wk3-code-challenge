# Flatdango Movie Theater

## Overview
Flatdango is a web application that allows users to view available movies, check their details, buy tickets, and view updated ticket availability. It uses a local JSON database and communicates with the backend using the Fetch API.

## Features
- View movie details including poster, title, runtime, showtime, and available tickets.
- See a list of all movies in the theater.
- Purchase tickets for movies (updated in real-time).
- Prevent purchasing if the movie is sold out.

## Technologies Used
- HTML
- CSS
- JavaScript
- JSON Server (for local data storage)

## Setup
1. Clone the repository.
2. Install `json-server` by running `npm install -g json-server`.
3. Run the backend server using `json-server --watch db.json --port 3000`.
4. Open `index.html` in a web browser to view the application.

## Contributing
Feel free to fork and contribute to the project. Create an issue if you encounter any bugs or have feature requests.
