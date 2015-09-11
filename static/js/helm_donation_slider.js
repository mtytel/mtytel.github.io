
/**
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2015 Matt Tytel
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

$(function() {
  var default_amount_index = 3;
  var amounts = ["Nope", "$1", "$2", "$5", "$10", "$20", "$50"];
  var amount = $("#donation-amount");
  amount.val(amounts[default_amount_index]);
  var donation = $("#donation");

  var slider_section = $("#slider-section");
  var downloads = $("#downloads");

  slider_section.css({
    "position":"absolute",
  });
  slider_section.fadeTo(0, 0);
  slider_section.hide();

  var download_link = $("#download-link");
  download_link.click(function() {
    downloads.fadeTo("slow", 0, function() { downloads.hide(); });
    slider_section.fadeTo("slow", 1);
  });

  var downloads = $("#downloads");

  var slider = $("<div id='slider'></div>").insertAfter(donation).slider({
    min: 0,
    max: 6,
    range: "min",
    value: default_amount_index,
    slide: function(event, ui) {
      amount.val(amounts[ui.value]);
    }
  });
  $("#donation-amount").change(function() {
    slider.slider("value", this.val());
  });
});
