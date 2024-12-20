document.addEventListener("DOMContentLoaded", () => {
  const filmsList = document.getElementById("films");
  const filmDetails = document.getElementById("film-details");
  const buyTicketBtn = document.getElementById("buy-ticket-btn");
  let currentFilm;

  // Fetch all films
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((films) => {
      films.forEach((film) => {
        const li = document.createElement("li");
        li.textContent = film.title;
        li.classList.add("film", "item");
        li.addEventListener("click", () => showFilmDetails(film));
        filmsList.appendChild(li);
      });

      // Show the first film by default
      showFilmDetails(films[0]);
    });

  // Show movie details
  function showFilmDetails(film) {
    currentFilm = film;
    document.getElementById("film-poster").src = film.poster;
    document.getElementById("film-title").textContent = film.title;
    document.getElementById("film-description").textContent = film.description;
    document.getElementById("film-runtime").textContent = film.runtime;
    document.getElementById("film-showtime").textContent = film.showtime;
    updateAvailableTickets();

    // Disable button if sold out
    if (film.capacity - film.tickets_sold <= 0) {
      buyTicketBtn.disabled = true;
      buyTicketBtn.textContent = "Sold Out";
    } else {
      buyTicketBtn.disabled = false;
      buyTicketBtn.textContent = "Buy Ticket";
    }
  }

  // Update available tickets
  function updateAvailableTickets() {
    const availableTickets = currentFilm.capacity - currentFilm.tickets_sold;
    document.getElementById("available-tickets").textContent = availableTickets;
  }

  
  buyTicketBtn.addEventListener("click", () => {
    if (currentFilm.capacity - currentFilm.tickets_sold > 0) {
      currentFilm.tickets_sold += 1;
      updateAvailableTickets();
      // Send PATCH request to update tickets sold
      fetch(`http://localhost:3000/films/${currentFilm.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tickets_sold: currentFilm.tickets_sold
        })
      });
    }
  });
});
