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

function showSticker() {
  var logo = $('#helm-logo');
  logo.fadeOut(400, function() {
    logo.prop("src", "/static/images/helm_sticker_small.png");
    $(this).fadeIn(400);
  });
}

function showDonate() {
  var downloads = $("#downloads");
  var payment_section = $("#payment-section");
  downloads.fadeTo(400, 0, function() {
    downloads.css({"visibility":"hidden"});

    payment_section.css({"visibility":"visible"});
    payment_section.fadeTo(400, 1);

    var tagline = $(".tagline");
    tagline.css({"visibility":"visible",
                 "display":"block"});
  });

  var catch_phrase = $("#catch-phrase");
  catch_phrase.fadeOut(400, function() {
    catch_phrase.text("what you want to");
    $(this).fadeIn(400);
  });

  var name = $("#product-name");
  name.fadeOut(400, function() {
    name.text("Pay");
    $(this).fadeIn(400);
  });
}

function setupDonate() {
  var default_amount_index = 3;

  var display = $("#donation-display");
  var amount = $("#donation-amount");
  var donation = $("#donation");

  var payment_section = $("#payment-section");
  var download_list_section = $(".download-list");

  payment_section.css({
    "position":"absolute",
  });
  download_list_section.css({
    "position":"absolute",
  });

  payment_section.fadeTo(0, 0);
  payment_section.hide();

  display.keypress(function(e) {
    var value = display.val();
    value = value.replace("$", "");
    var float_value = parseFloat(value);
    amount.val(float_value);

    return true;
  });

  var contribute_button = $("#contribute-button");
  var nopay_button = $("#nopay-button");
  var pay_buttons = $(".pay-amount-button");

  var displayCheck = function() {
    var value = display.val();
    value = value.replace("$", "");
    var float_value = parseFloat(value);
    amount.val(float_value);

    if (float_value > 0) {
      nopay_button.hide();
      contribute_button.show();
    }
    else {
      nopay_button.show();
      contribute_button.hide();
    }
  }

  display.click(function() {
    display.attr("class", "text-selected");
    pay_buttons.attr("class", "pay-amount-button amount-not-pressed");
    displayCheck();
  });

  pay_buttons.click(function() {
    display.attr("class", "");
    pay_buttons.attr("class", "pay-amount-button amount-not-pressed");
    $(this).attr("class", "pay-amount-button amount-pressed");
    var value = $(this).text();
    value = value.replace("$", "");
    value = value.replace(" ", "");
    var float_value = parseFloat(value);
    amount.val(float_value);
    nopay_button.hide();
    contribute_button.show();
  });

  display.on("input", function() {
    displayCheck();
  });
}

$(function() {
  setupDonate();

  var download_link = $("#download-link");
  download_link.click(function() {
    showDonate();
    return false;
  });

  var specific_download_link = $(".os-download");
  specific_download_link.click(function() {
    var os = $(this).attr("name");
    if (os) {
      var new_remind_link = "/helm/remind/" + os + "/";
      $(".remind").attr("href", new_remind_link);

      var new_return_link = "http://tytel.org/helm/processed/" + os + "/";
      $(".return-link").val(new_return_link);
    }
    showDonate();
    return false;
  });
});
