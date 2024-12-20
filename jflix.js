document.addEventListener('DOMContentLoaded', () => {
  const movieDetails = {
    title: "Inception",
    runtime: "148 minutes",
    showtime: "7:00 PM",
    availableTickets: 50,
    poster: "inception-poster.jpg" // Add a valid image path
  };

  // Populate movie details
  document.getElementById('title').textContent = movieDetails.title;
  document.getElementById('runtime').textContent = `Runtime: ${movieDetails.runtime}`;
  document.getElementById('showtime').textContent = `Showtime: ${movieDetails.showtime}`;
  document.getElementById('available-tickets').textContent = `Available Tickets: ${movieDetails.availableTickets}`;
  document.getElementById('poster').src = movieDetails.poster;

  // Ticket purchase logic
  const buyTicketButton = document.getElementById('buy-ticket');
  buyTicketButton.addEventListener('click', () => {
    if (movieDetails.availableTickets > 0) {
      movieDetails.availableTickets--;
      document.getElementById('available-tickets').textContent = `Available Tickets: ${movieDetails.availableTickets}`;
    } else {
      alert("Sold Out!");
    }
  });
});
