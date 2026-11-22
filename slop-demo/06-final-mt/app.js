// RoomBook AI - Main Application File
// This file contains all the logic for the RoomBook application

console.log("RoomBook app loading...");
console.log("Config loaded:", CONFIG);

// Helper function to create room images
function makeRoomImage(color1, color2, emoji) {
  return "data:image/svg+xml;utf8," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='" + color1 + "'/><stop offset='1' stop-color='" + color2 + "'/>" +
    "</linearGradient></defs><rect width='400' height='200' fill='url(#g)'/>" +
    "<text x='200' y='120' font-size='64' text-anchor='middle'>" + emoji + "</text></svg>"
  );
}

// Small line icons for the room facts (decorative)
var ICON_PEOPLE = "<svg class='icon' viewBox='0 0 24 24' width='16' height='16' aria-hidden='true'><circle cx='9' cy='8' r='3.5' fill='none' stroke='currentColor' stroke-width='1.8'/><path d='M2.5 19.5c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round'/><path d='M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.7 3 2.3 3.5 4.7' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round'/></svg>";
var ICON_FLOOR = "<svg class='icon' viewBox='0 0 24 24' width='16' height='16' aria-hidden='true'><path d='M12 3 3 7.5 12 12l9-4.5L12 3Z' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linejoin='round'/><path d='m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linejoin='round'/></svg>";

// Rooms data
var rooms = [
  {
    id: 1,
    name: "Room A",
    photo: "images/room-a.jpg",
    photoSet: "images/room-a-600.jpg 600w, images/room-a.jpg 1200w",
    tagline: "Small room for quick syncs",
    capacity: 4,
    floor: 1,
    features: ["TV Screen", "Mic", "Coffee"],
    isNew: false,
    isPopular: true,
    image: "images/room-a.jpg"
  },
  {
    id: 2,
    name: "Room B",
    photo: "images/room-b.jpg",
    photoSet: "images/room-b-600.jpg 600w, images/room-b.jpg 1200w",
    tagline: "Mid-size room for video calls and reviews",
    capacity: 8,
    floor: 1,
    features: ["TV Screen", "Video Call", "Whiteboard", "AC"],
    isNew: true,
    isPopular: false,
    image: "images/room-b.jpg"
  },
  {
    id: 3,
    name: "Room C",
    photo: "images/room-c.jpg",
    photoSet: "images/room-c-600.jpg 600w, images/room-c.jpg 1200w",
    tagline: "Quiet room for 1:1s and focus work",
    capacity: 2,
    floor: 2,
    features: ["Quiet", "Plants"],
    isNew: false,
    isPopular: false,
    image: "images/room-c.jpg"
  },
  {
    id: 4,
    name: "Room D",
    photo: "images/room-d.jpg",
    photoSet: "images/room-d-600.jpg 600w, images/room-d.jpg 1200w",
    tagline: "Large room for planning sessions",
    capacity: 12,
    floor: 2,
    features: ["Projector", "Video Call", "Whiteboard", "Mic", "Coffee"],
    isNew: false,
    isPopular: true,
    image: "images/room-d.jpg"
  },
  {
    id: 5,
    name: "Room E",
    photo: "images/room-e.jpg",
    photoSet: "images/room-e-600.jpg 600w, images/room-e.jpg 1200w",
    tagline: "Mid-size room with a whiteboard",
    capacity: 6,
    floor: 3,
    features: ["TV Screen", "Whiteboard"],
    isNew: true,
    isPopular: false,
    image: "images/room-e.jpg"
  },
  {
    id: 6,
    name: "Room F",
    photo: "images/room-f.jpg",
    photoSet: "images/room-f-600.jpg 600w, images/room-f.jpg 1200w",
    tagline: "Largest room, for all-hands and training",
    capacity: 20,
    floor: 3,
    features: ["Projector", "Mic", "Video Call", "Catering"],
    isNew: false,
    isPopular: true,
    image: "images/room-f.jpg"
  }
];

// Get today's date in YYYY-MM-DD format
var today = new Date().toISOString().split("T")[0];

// Bookings data
let bookings = [
  { id: 101, roomId: 1, title: "Weekly sync", date: today, start: "9:00", end: "10:00", attendees: 4, bookedBy: "Alex", mine: false },
  { id: 102, roomId: 4, title: "Quarterly planning", date: today, start: "9:00", end: "11:30", attendees: 10, bookedBy: "You", mine: true },
  { id: 103, roomId: 2, title: "Design review", date: today, start: "13:00", end: "14:00", attendees: 6, bookedBy: "Sam", mine: false },
  { id: 104, roomId: 6, title: "All hands", date: today, start: "15:00", end: "16:00", attendees: 18, bookedBy: "You", mine: true },
  { id: 105, roomId: 3, title: "1:1", date: today, start: "10:00", end: "11:00", attendees: 2, bookedBy: "Jordan", mine: false }
];

var currentFilter = "all";
var nextId = 106;
let selectedRoomId = null;
var isLoading = false;

console.log("Initial bookings:", bookings);

// This function initializes the application
function init() {
  console.log("Initializing app...");
  populateRoomSelect();
  populateTimeSelects();
  document.getElementById("booking-date").value = today;
  showWelcomeBanner();
  renderRooms();
  renderMyBookings();
  setupSearch();
  // loadBookings();
  console.log("App initialized!");
}

// This function shows the welcome banner from the URL
function showWelcomeBanner() {
  var params = new URLSearchParams(window.location.search);
  var team = params.get("team");
  if (team) {
    document.getElementById("welcome-banner").innerHTML = "Signed in as <strong>" + team + "</strong>.";
  }
}

// This function populates the room dropdown
function populateRoomSelect() {
  var select = document.getElementById("booking-room");
  var html = "<option value=''>Select a room</option>";
  for (var i = 0; i < rooms.length; i++) {
    html += "<option value='" + rooms[i].id + "'>" + rooms[i].name + " (" + rooms[i].capacity + " people)</option>";
  }
  select.innerHTML = html;
}

// This function populates the time dropdowns
function populateTimeSelects() {
  var startSelect = document.getElementById("booking-start");
  var endSelect = document.getElementById("booking-end");
  var html = "";
  for (var h = 8; h <= 18; h++) {
    html += "<option value='" + h + ":00'>" + h + ":00</option>";
    if (h != 18) {
      html += "<option value='" + h + ":30'>" + h + ":30</option>";
    }
  }
  startSelect.innerHTML = "<option value=''>Start</option>" + html;
  endSelect.innerHTML = "<option value=''>End</option>" + html;
}

// This function gets the status of a room
function getRoomStatus(roomId) {
  var now = new Date();
  var currentHour = now.getHours();
  var currentMinutes = now.getMinutes();
  var currentTime = currentHour + ":" + (currentMinutes < 10 ? "0" + currentMinutes : currentMinutes);
  for (var i = 0; i < bookings.length; i++) {
    var b = bookings[i];
    if (b.roomId == roomId && b.date == today) {
      if (currentTime >= b.start && currentTime < b.end) {
        return "busy";
      }
      // check if booking starts within 30 minutes
      var startHour = parseInt(b.start.split(":")[0]);
      if (startHour - currentHour == 1 && currentMinutes > 30) {
        return "soon";
      }
    }
  }
  return "available";
}

// This function renders all rooms
function renderRooms() {
  console.log("Rendering rooms with filter:", currentFilter);
  var grid = document.getElementById("rooms-grid");
  var html = "";
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    var status = getRoomStatus(room.id);
    var statusHtml = "";
    if (status == "available") {
      statusHtml = "<span class='room-status status-available'><span class='status-dot'></span>Available</span>";
    } else if (status == "busy") {
      statusHtml = "<span class='room-status status-busy'><span class='status-dot'></span>Busy</span>";
    } else {
      statusHtml = "<span class='room-status status-soon'><span class='status-dot'></span>Busy soon</span>";
    }
    var featuresHtml = room.features.join(", ");
    html += "<article class='room-card'>";
    html += "<div class='room-media'>";
    html += "<img src='" + room.photo + "' srcset='" + room.photoSet + "' sizes='(max-width: 640px) 100vw, 360px' width='1200' height='675' class='room-image' alt='" + room.name + ": " + room.tagline + "' loading='lazy' onerror='this.remove()'>";
    html += "</div>";
    html += "<div class='room-card-inner'>";
    html += "<div class='room-head'><h3 class='room-name'>" + room.name + "</h3>" + statusHtml + "</div>";
    html += "<ul class='room-facts'><li>" + ICON_PEOPLE + room.capacity + " people</li><li>" + ICON_FLOOR + "Floor " + room.floor + "</li></ul>";
    html += "<p class='room-tagline'>" + room.tagline + "</p>";
    html += "<p class='room-features'>" + featuresHtml + "</p>";
    html += "<button type='button' class='btn btn-primary room-book-btn' onclick='selectRoom(" + room.id + ")'>Book " + room.name + "</button>";
    html += "</div>";
    html += "</article>";
  }
  grid.innerHTML = html;
}

// This function renders only available rooms
function renderAvailableRooms() {
  console.log("Rendering available rooms");
  var grid = document.getElementById("rooms-grid");
  var html = "";
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    var status = getRoomStatus(room.id);
    if (status != "available") continue;
    var statusHtml = "<span class='room-status status-available'><span class='status-dot'></span>Available</span>";
    var featuresHtml = room.features.join(", ");
    html += "<article class='room-card'>";
    html += "<div class='room-media'>";
    html += "<img src='" + room.photo + "' srcset='" + room.photoSet + "' sizes='(max-width: 640px) 100vw, 360px' width='1200' height='675' class='room-image' alt='" + room.name + ": " + room.tagline + "' loading='lazy' onerror='this.remove()'>";
    html += "</div>";
    html += "<div class='room-card-inner'>";
    html += "<div class='room-head'><h3 class='room-name'>" + room.name + "</h3>" + statusHtml + "</div>";
    html += "<ul class='room-facts'><li>" + ICON_PEOPLE + room.capacity + " people</li><li>" + ICON_FLOOR + "Floor " + room.floor + "</li></ul>";
    html += "<p class='room-tagline'>" + room.tagline + "</p>";
    html += "<p class='room-features'>" + featuresHtml + "</p>";
    html += "<button type='button' class='btn btn-primary room-book-btn' onclick='selectRoom(" + room.id + ")'>Book " + room.name + "</button>";
    html += "</div>";
    html += "</article>";
  }
  if (html == "") {
    html = "<div class='empty-state'>No rooms are free right now.</div>";
  }
  grid.innerHTML = html;
}

// This function renders popular rooms
function renderPopularRooms() {
  console.log("Rendering popular rooms");
  var grid = document.getElementById("rooms-grid");
  var html = "";
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    if (!room.isPopular) continue;
    var status = getRoomStatus(room.id);
    var statusHtml = "";
    if (status == "available") {
      statusHtml = "<span class='room-status status-available'><span class='status-dot'></span>Available</span>";
    } else if (status == "busy") {
      statusHtml = "<span class='room-status status-busy'><span class='status-dot'></span>Busy</span>";
    } else {
      statusHtml = "<span class='room-status status-soon'><span class='status-dot'></span>Busy soon</span>";
    }
    var featuresHtml = room.features.join(", ");
    html += "<article class='room-card'>";
    html += "<div class='room-media'>";
    html += "<img src='" + room.photo + "' srcset='" + room.photoSet + "' sizes='(max-width: 640px) 100vw, 360px' width='1200' height='675' class='room-image' alt='" + room.name + ": " + room.tagline + "' loading='lazy' onerror='this.remove()'>";
    html += "</div>";
    html += "<div class='room-card-inner'>";
    html += "<div class='room-head'><h3 class='room-name'>" + room.name + "</h3>" + statusHtml + "</div>";
    html += "<ul class='room-facts'><li>" + ICON_PEOPLE + room.capacity + " people</li><li>" + ICON_FLOOR + "Floor " + room.floor + "</li></ul>";
    html += "<p class='room-tagline'>" + room.tagline + "</p>";
    html += "<p class='room-features'>" + featuresHtml + "</p>";
    html += "<button type='button' class='btn btn-primary room-book-btn' onclick='selectRoom(" + room.id + ")'>Book " + room.name + "</button>";
    html += "</div>";
    html += "</article>";
  }
  grid.innerHTML = html;
}

// This function renders large rooms
function renderLargeRooms() {
  console.log("Rendering large rooms");
  var grid = document.getElementById("rooms-grid");
  var html = "";
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    if (room.capacity < 8) continue;
    var status = getRoomStatus(room.id);
    var statusHtml = "";
    if (status == "available") {
      statusHtml = "<span class='room-status status-available'><span class='status-dot'></span>Available</span>";
    } else if (status == "busy") {
      statusHtml = "<span class='room-status status-busy'><span class='status-dot'></span>Busy</span>";
    } else {
      statusHtml = "<span class='room-status status-soon'><span class='status-dot'></span>Busy soon</span>";
    }
    var featuresHtml = room.features.join(", ");
    html += "<article class='room-card'>";
    html += "<div class='room-media'>";
    html += "<img src='" + room.photo + "' srcset='" + room.photoSet + "' sizes='(max-width: 640px) 100vw, 360px' width='1200' height='675' class='room-image' alt='" + room.name + ": " + room.tagline + "' loading='lazy' onerror='this.remove()'>";
    html += "</div>";
    html += "<div class='room-card-inner'>";
    html += "<div class='room-head'><h3 class='room-name'>" + room.name + "</h3>" + statusHtml + "</div>";
    html += "<ul class='room-facts'><li>" + ICON_PEOPLE + room.capacity + " people</li><li>" + ICON_FLOOR + "Floor " + room.floor + "</li></ul>";
    html += "<p class='room-tagline'>" + room.tagline + "</p>";
    html += "<p class='room-features'>" + featuresHtml + "</p>";
    html += "<button type='button' class='btn btn-primary room-book-btn' onclick='selectRoom(" + room.id + ")'>Book " + room.name + "</button>";
    html += "</div>";
    html += "</article>";
  }
  grid.innerHTML = html;
}

// This function filters the rooms based on the selected filter
function filterRooms(filter) {
  console.log("Filter clicked:", filter);
  currentFilter = filter;
  var chips = document.querySelectorAll(".filter-chip");
  for (var i = 0; i < chips.length; i++) {
    chips[i].classList.remove("active");
    chips[i].setAttribute("aria-pressed", chips[i].getAttribute("data-filter") == filter ? "true" : "false");
  }
  if (filter == "all") {
    renderRooms();
  } else if (filter == "available") {
    renderAvailableRooms();
  } else if (filter == "large") {
    renderLargeRooms();
  } else if (filter == "popular") {
    renderPopularRooms();
  }
  // if (filter === "new") {
  //   renderNewRooms();
  // }
}

// This function sets up the search functionality
function setupSearch() {
  var input = document.getElementById("room-search");
  input.addEventListener("keyup", function () {
    searchRooms(input.value);
  });
  // Allow sharing a search link e.g. ?q=capacity > 6
  var q = new URLSearchParams(window.location.search).get("q");
  if (q) {
    input.value = q;
    searchRooms(q);
  }
}

// This function searches the rooms using a dynamic filter
function searchRooms(query) {
  console.log("Searching for:", query);
  var grid = document.getElementById("rooms-grid");
  var results = [];
  if (query == "") {
    renderRooms();
    return;
  }
  // Support advanced filters like "capacity > 6" or "floor == 2"
  if (query.indexOf(">") > -1 || query.indexOf("<") > -1 || query.indexOf("==") > -1) {
    for (var i = 0; i < rooms.length; i++) {
      var room = rooms[i];
      try {
        if (eval("room." + query.trim())) {
          results.push(room);
        }
      } catch (e) {
        console.log("Invalid filter", e);
      }
    }
  } else {
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].name.toLowerCase().indexOf(query.toLowerCase()) > -1 || rooms[i].tagline.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        results.push(rooms[i]);
      }
    }
  }
  var html = "";
  for (var k = 0; k < results.length; k++) {
    html += "<article class='room-card'>";
    html += "<div class='room-media'>";
    html += "<img src='" + results[k].photo + "' srcset='" + results[k].photoSet + "' sizes='(max-width: 640px) 100vw, 360px' width='1200' height='675' class='room-image' alt='" + results[k].name + ": " + results[k].tagline + "' loading='lazy' onerror='this.remove()'>";
    html += "</div>";
    html += "<div class='room-card-inner'>";
    html += "<h3 class='room-name'>" + results[k].name + "</h3>";
    html += "<ul class='room-facts'><li>" + ICON_PEOPLE + results[k].capacity + " people</li><li>" + ICON_FLOOR + "Floor " + results[k].floor + "</li></ul>";
    html += "<p class='room-tagline'>" + results[k].tagline + "</p>";
    html += "<button type='button' class='btn btn-primary room-book-btn' onclick='selectRoom(" + results[k].id + ")'>Book " + results[k].name + "</button>";
    html += "</div></article>";
  }
  if (results.length == 0) {
    html = "<div class='empty-state'>No rooms found for <b>" + query + "</b></div>";
  }
  grid.innerHTML = html;
}

// This function selects a room and scrolls to the booking form
function selectRoom(roomId) {
  console.log("Room selected:", roomId);
  selectedRoomId = roomId;
  document.getElementById("booking-room").value = roomId;
  scrollToSection("book");
}

// This function checks if a room is available for the given time slot
function isRoomAvailable(roomId, date, start, end) {
  console.log("Checking availability", roomId, date, start, end);
  for (var i = 0; i < bookings.length - 1; i++) {
    var b = bookings[i];
    if (b.roomId == roomId && b.date == date) {
      if ((start >= b.start && start < b.end) || (end > b.start && end <= b.end)) {
        return false;
      }
    }
  }
  return true;
}

// This function handles the booking logic
function handleBookingSubmit() {
  console.log("Booking submitted");
  var roomId = document.getElementById("booking-room").value;
  var title = document.getElementById("booking-title").value;
  var date = document.getElementById("booking-date").value;
  var start = document.getElementById("booking-start").value;
  var end = document.getElementById("booking-end").value;
  var attendees = document.getElementById("booking-attendees").value;
  var name = document.getElementById("booking-name").value;
  var messageEl = document.getElementById("booking-message");

  // Validate the form
  if (roomId == "" || title == "" || date == "" || start == "" || end == "") {
    messageEl.className = "booking-message error";
    messageEl.innerHTML = "Fill in room, title, date, start and end.";
    return;
  }

  // Check that end is after start
  if (end <= start) {
    messageEl.className = "booking-message error";
    messageEl.innerHTML = "End time must be after start time.";
    return;
  }

  // Check the room capacity
  var room = null;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].id == roomId) {
      room = rooms[i];
    }
  }
  if (attendees > room.capacity + 2) {
    messageEl.className = "booking-message error";
    messageEl.innerHTML = "Too many attendees for " + room.name + ".";
    return;
  }

  // Check the max booking length
  var hours = parseInt(end.split(":")[0]) - parseInt(start.split(":")[0]);
  if (hours > 4) {
    messageEl.className = "booking-message error";
    messageEl.innerHTML = "A booking can be at most 4 hours.";
    return;
  }

  // Check if the room is available
  if (!isRoomAvailable(roomId, date, start, end)) {
    messageEl.className = "booking-message error";
    messageEl.innerHTML = room.name + " is already booked at that time.";
    return;
  }

  // Create the booking
  var newBooking = {
    id: nextId++,
    roomId: parseInt(roomId),
    title: title,
    date: date,
    start: start,
    end: end,
    attendees: attendees,
    bookedBy: name || "You",
    mine: true
  };

  bookings.push(newBooking);
  console.log("New booking created:", newBooking);
  console.log("All bookings:", bookings);

  saveBookings();

  if (CONFIG.ENABLE_NOTIFICATIONS == true) {
    sendSlackNotification(newBooking);
  }

  messageEl.className = "booking-message success";
  messageEl.innerHTML = "Booked: <b>" + title + "</b> in " + room.name + ".";

  // Reset the form
  document.getElementById("booking-title").value = "";
  document.getElementById("booking-attendees").value = "";

  renderMyBookings();
  filterRooms(currentFilter);

  setTimeout(function () {
    messageEl.innerHTML = "";
  }, 5000);
}

// This function saves the bookings to local storage
function saveBookings() {
  try {
    localStorage.setItem("roombook_bookings", JSON.stringify(bookings));
    syncBookingsToServer(bookings);
  } catch (e) {}
}

// This function loads the bookings from local storage
function loadBookings() {
  var saved = localStorage.getItem("roombook_bookings");
  if (saved) {
    bookings = JSON.parse(saved);
  }
}

// This function syncs bookings to the server
function syncBookingsToServer(data) {
  if (CONFIG.DEBUG) {
    console.log("Syncing to server with key", CONFIG.API_KEY);
  }
  fetch(CONFIG.API_URL + "/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + CONFIG.API_KEY,
      "X-Secret": CONFIG.SECRET
    },
    body: JSON.stringify(data)
  });
}

// This function sends a slack notification
function sendSlackNotification(booking) {
  fetch(CONFIG.SLACK_WEBHOOK, {
    method: "POST",
    body: JSON.stringify({ text: "New booking: " + booking.title })
  }).then(function (res) {
    console.log("Slack notified", res);
  });
}

// This function renders the user's bookings
function renderMyBookings() {
  console.log("Rendering my bookings");
  var list = document.getElementById("my-bookings-list");
  var html = "";
  var myBookings = bookings.filter(function (b) {
    return b.mine == true;
  });
  myBookings.sort(function (a, b) {
    if (a.date == b.date) {
      return a.start > b.start ? 1 : -1;
    }
    return a.date > b.date ? 1 : -1;
  });
  if (myBookings.length == 0) {
    list.innerHTML = "<div class='empty-state'>You have no bookings.</div>";
    return;
  }
  for (var i = 0; i < myBookings.length; i++) {
    html += renderBookingItem(myBookings[i]);
  }
  list.innerHTML = html;
}

// This function renders a single booking item
function renderBookingItem(booking) {
  var room = getRoomById(booking.roomId);
  var html = "";
  html += "<div class='booking-item'>";
  html += "<div class='booking-item-inner'>";
  html += "<h3 class='booking-title'>" + booking.title + "</h3>";
  html += "<div class='booking-details'>" + room.name + " · " + formatDate(booking.date) + " · " + booking.start + " - " + booking.end + "</div>";
  html += "</div>";
  html += "<button type='button' class='btn btn-secondary btn-sm cancel-btn' onclick='cancelBooking(" + booking.id + ")'>Cancel</button>";
  html += "</div>";
  return html;
}

// This function renders a single booking item for the upcoming list
function renderUpcomingBookingItem(booking) {
  var room = getRoomById(booking.roomId);
  var html = "";
  html += "<div class='booking-item'>";
  html += "<div class='booking-item-inner'>";
  html += "<h3 class='booking-title'>" + booking.title + "</h3>";
  html += "<div class='booking-details'>" + room.name + " · " + formatDateNice(booking.date) + " · " + booking.start + " - " + booking.end + "</div>";
  html += "</div>";
  html += "<button type='button' class='btn btn-secondary btn-sm cancel-btn' onclick='cancelBooking(" + booking.id + ")'>Cancel</button>";
  html += "</div>";
  return html;
}

// This function gets a room by its id
function getRoomById(id) {
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].id == id) {
      return rooms[i];
    }
  }
  return null;
}

// This function finds a room by its id
function findRoom(roomId) {
  return rooms.filter(function (r) {
    return r.id == roomId;
  })[0];
}

// This function cancels a booking
function cancelBooking(bookingId) {
  console.log("Cancelling booking", bookingId);
  if (confirm("Cancel this booking?")) {
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].id == bookingId) {
        bookings.splice(i, 1);
        break;
      }
    }
    saveBookings();
    renderMyBookings();
    filterRooms(currentFilter);
  }
}

// This function formats a date
function formatDate(dateStr) {
  var d = new Date(dateStr);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

// This function formats a date nicely
function formatDateNice(dateStr) {
  var d = new Date(dateStr);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

// This function formats a time
function formatTime(timeStr) {
  var parts = timeStr.split(":");
  var hour = parseInt(parts[0]);
  var ampm = hour >= 12 ? "PM" : "AM";
  if (hour > 12) hour = hour - 12;
  return hour + ":" + parts[1] + " " + ampm;
}

// This function gets an AI-powered room recommendation
function getAIRecommendation(attendees) {
  console.log("Getting AI recommendation for", attendees);
  if (!CONFIG.ENABLE_AI) return null;
  var best = null;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].capacity >= attendees) {
      if (best == null || rooms[i].capacity < best.capacity) {
        best = rooms[i];
      }
    }
  }
  return best;
}

// This function calculates the total number of hours booked
function calculateTotalHours() {
  var total = 0;
  for (var i = 0; i < bookings.length; i++) {
    var start = parseInt(bookings[i].start.split(":")[0]);
    var end = parseInt(bookings[i].end.split(":")[0]);
    total = total + (end - start);
  }
  return total;
}

// This function calculates the utilization of a room
function calculateUtilization(roomId) {
  var hours = 0;
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].roomId == roomId) {
      hours += parseInt(bookings[i].end) - parseInt(bookings[i].start);
    }
  }
  return Math.round((hours / 10) * 100);
}

// function renderNewRooms() {
//   var grid = document.getElementById("rooms-grid");
//   var html = "";
//   for (var i = 0; i < rooms.length; i++) {
//     if (rooms[i].isNew) {
//       html += "<div class='room-card'>" + rooms[i].name + "</div>";
//     }
//   }
//   grid.innerHTML = html;
// }

// function validateEmail(email) {
//   var re = /\S+@\S+\.\S+/;
//   return re.test(email);
// }

// OLD booking function - keeping just in case
// function bookRoom(roomId, title, start, end) {
//   bookings.push({ roomId: roomId, title: title, start: start, end: end });
//   alert("Booked!");
//   renderMyBookings();
// }

// This function scrolls to a section
function scrollToSection(id) {
  console.log("Scrolling to", id);
  var el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// This function shows a loading spinner
function showLoading() {
  isLoading = true;
  // TODO: implement loading spinner
}

// This function hides the loading spinner
function hideLoading() {
  isLoading = false;
  // TODO: implement loading spinner
}

// Initialize the app when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  init();
});
