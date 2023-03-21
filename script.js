function load() {
  var interval = setInterval(myURL, 5000);
  var result = document.getElementById("result");
  result.innerHTML =
    "<b> The page will load after delay of 5 seconds using setInterval() method.";
}

function myURL() {
  window.open("https://www.tutorialspoint.com/index.htm", (name = self));
  clearInterval(interval);
}

$(document).ready(function () {
  var targetParentID;
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function (event) {
    // identify row on which save button was pressed
    targetParentID = $(this).parent().attr("id");
    // get input from the sibling text field of event target
    const note = $(this).siblings(".description").val();
    // save input to local storage for that specific hour block
    localStorage.setItem(targetParentID, note);

    console.log(
      `Save button was pressed at ${targetParentID}. \nThe note reads: ${note}`
    );
  });

  $(".time-block").each(function rowClass() {
    const currentHour = dayjs().hour();

    const blockNum = +$(this).attr("id").slice(5);

    // compare current hour to current to block number and set attributes
    if (currentHour === blockNum) {
      $(this).attr("class", "row time-block present");
    } else if (currentHour < blockNum) {
      $(this).attr("class", "row time-block future");
    } else {
      $(this).attr("class", "row time-block past");
    }
  });

  $(".time-block").each(function savedNotes() {
    // variable to get hour-id key from local storage
    const localKey = $(this).attr("id");
    // variable to store value of hour-id if in local storage
    const savedNote = localStorage.getItem(localKey);
    if (savedNote) {
      $(this).children(".description").text(savedNote);
    }
  });

  // Display the current date in the header of the page.
  function displayDate() {
    const currentDayEl = $("#currentDay");
    const today = dayjs().format("dddd, MMMM D");
    currentDayEl.text(today);
  }

  displayDate();
  setInterval(displayDate, 1000);
});
