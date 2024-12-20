document.addEventListener('DOMContentLoaded', () => {
  // URL for the server
  const serverUrl = 'http://localhost:3000/films';

  // Select the elements from the DOM
  const filmsList = document.getElementById('films');
  const movieDetails = document.getElementById('movie-details');
  const buyTicketButton = document.getElementById('buy-ticket');
  const titleElement = document.getElementById('title');
  const runtimeElement = document.getElementById('runtime');
  const showtimeElement = document.getElementById('showtime');
  const availableTicketsElement = document.getElementById('available-tickets');
  const posterElement = document.getElementById('poster');

  // Function to fetch and display all films
  function fetchMovies() {
    fetch(serverUrl)
      .then(response => response.json())
      .then(movies => {
        movies.forEach(movie => {
          const li = document.createElement('li');
          li.classList.add('film', 'item');
          li.textContent = movie.title;
          li.dataset.id = movie.id;
          filmsList.appendChild(li);

          // Add event listener to each movie to display its details
          li.addEventListener('click', () => {
            displayMovieDetails(movie);
          });
        });
      })
      .catch(error => console.error('Error fetching movies:', error));
  }

  // Function to display movie details
  function displayMovieDetails(movie) {
    titleElement.textContent = movie.title;
    runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
    showtimeElement.textContent = `Showtime: ${movie.showtime}`;
    const availableTickets = movie.capacity - movie.tickets_sold;
    availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    posterElement.src = movie.poster;

    // Update buy ticket button status
    buyTicketButton.disabled = availableTickets <= 0;
    buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';

    // Attach event listener for buying tickets
    buyTicketButton.onclick = () => {
      if (availableTickets > 0) {
        updateTickets(movie.id, movie.tickets_sold + 1);
      } else {
        alert('This movie is sold out!');
      }
    };
  }

  // Function to update ticket count in the server
  function updateTickets(movieId, updatedTicketsSold) {
    fetch(`${serverUrl}/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
    })
    .then(response => response.json())
    .then(updatedMovie => {
      const availableTickets = updatedMovie.capacity - updatedMovie.tickets_sold;
      availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
      buyTicketButton.disabled = availableTickets <= 0;
      buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';
    })
    .catch(error => console.error('Error updating tickets:', error));
  }

  // Initial fetch of all movies
  fetchMovies();
});
