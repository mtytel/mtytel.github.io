
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

function getUrlParameter(param) {
  var url = decodeURIComponent(window.location.search.substring(1));
  var variables = url.split('&');

  for (var i = 0; i < variables.length; i++) {
    var read_param = variables[i].split('=');

    if (read_param[0] === param)
      return read_param[1];
  }

  return undefined;
};

$(document).ready(function initPayment() {
  var amount = 10;
  var amount_read = getUrlParameter("amount");

  if (amount_read)
    amount = parseInt(amount_read);

  $("#donation-amount").attr("value", amount);
  $(".donation-form").submit();
});

