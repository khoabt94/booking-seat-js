///////////////////////////////////////////////////////////
// SELECTORS
const container = document.querySelector(".container");
const seats = [...document.querySelectorAll(".row .seat:not(.occupied)")];
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

///////////////////////////////////////////////////////////
// HELPER FUNCTION

// Update total and count
const updateSelectCount = () => {
  const selectedSeats = [...document.querySelectorAll(".row .seat.selected")];
  const selectedSeatsCount = selectedSeats.length;

  // LocalStorage
  const seatsIndex = selectedSeats.map((seat) => seats.indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Update UI
  count.textContent = selectedSeatsCount;
  total.textContent = `$${selectedSeatsCount * ticketPrice}`;
};
// Update UI from LocalStorage
const updateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  selectedSeats.forEach((index) => seats[index].classList.add("selected"));
  updateSelectCount();
};

///////////////////////////////////////////////////////////
// EVENT LISTENERS

container.addEventListener("click", (e) => {
  const seat = e.target;
  if (seat.classList.contains("seat") && !seat.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectCount();
  }
});

// Movie Select
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectCount();
});

updateUI();
