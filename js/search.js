function searchEvents(searchString) {
  var searchString = searchString.toLowerCase();
  var events = document.getElementsByName("event");

  for (e of events) {
    var text = e.innerText.toLowerCase();

    if (!searchString) {
      if (!text.includes(searchString)) {
        e.classList.remove("hidden");
      }
    } else {
      if (text.includes(searchString)) {
        e.classList.remove("hidden");
      } else {
        e.classList.add("hidden");
      }
    }
  }
}
