// JavaScript code using jQuery
$(document).ready(function () {
  // Attach a click event handler to the checkboxes with IDs starting with "checkbox"
  $('input[type="checkbox"][id^="checkbox"]').on("click", function () {
    const index = $(this).data("index"); // Get the data-index attribute value
    const label = $(`label[for="checkbox${index}"]`); // Select the corresponding label

    // Toggle the "line-through" class on the label based on the checkbox's checked state
    label.toggleClass("line-through", this.checked);
  });
});
