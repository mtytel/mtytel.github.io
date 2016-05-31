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
  var slider_section = $("#slider-section");
  downloads.fadeTo(400, 0, function() {
    downloads.css({"visibility":"hidden"});

    slider_section.css({"visibility":"visible"});
    slider_section.fadeTo(400, 1);

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

function showPity() {
  var slider_section = $("#slider-section");
  var pity_section = $("#pity-section");
  slider_section.fadeTo(400, 0, function() {
    slider_section.css({"visibility":"hidden"});

    pity_section.css({"visibility":"visible"});
    pity_section.fadeTo(400, 1);
  });

  var catch_phrase = $("#catch-phrase");
  catch_phrase.fadeOut(400, function() {
    catch_phrase.text("give at least $1");
    $(this).fadeIn(400);
  });

  var name = $("#product-name");
  name.fadeOut(400, function() {
    name.text("Wait");
    $(this).fadeIn(400);
  });
}

function setupDonateSlider() {
  var default_amount_index = 4;
  var amounts = [0, 1, 2, 5, 10, 20, 50, 100];
  var amounts_display = ["$-"];
  for (var i = 1; i < amounts.length; i++)
    amounts_display.push("$" + amounts[i]);

  var amount = $("#donation-amount");
  amount.val(amounts_display[default_amount_index]);
  var donation = $("#donation");

  var slider_section = $("#slider-section");
  var pity_section = $("#pity-section");
  var download_list_section = $(".download-list");

  slider_section.css({
    "position":"absolute",
  });
  pity_section.css({
    "position":"absolute",
  });
  download_list_section.css({
    "position":"absolute",
  });

  slider_section.fadeTo(0, 0);
  slider_section.hide();

  var slider = $("<div id='slider'></div>").insertAfter(donation).slider({
    min: 0,
    max: 7,
    range: "min",
    value: default_amount_index,
    slide: function(event, ui) {
      amount.val(amounts_display[ui.value]);
      var contribute_button = $("#contribute-button");
      var nopay_button = $("#nopay-button");
      if (ui.value == 0) {
        nopay_button.show();
        contribute_button.hide();
      }
      else {
        nopay_button.hide();
        contribute_button.show();
      }
    }
  });

  amount.on("input", function() {
    var value = $(this).val();
    value = value.replace("$", "");
    var float_value = parseFloat(value);
    var contribute_button = $("#contribute-button");
    var nopay_button = $("#nopay-button");

    if (float_value > 0) {
      var slider_index = 1;
      for (var i = 1; i < amounts.length - 1; ++i) {
        if (float_value > amounts[i])
          slider_index = i + 1;
      }

      slider.slider("option", "value", slider_index);
      nopay_button.hide();
      contribute_button.show();
    }
    else {
      slider.slider("option", "value", 0);
      nopay_button.show();
      contribute_button.hide();
    }
  });
}

$(function() {
  setupDonateSlider();

  var download_link = $("#download-link");
  download_link.click(function() {
    showDonate();
    return false;
  });

  var specific_download_link = $(".os-download");
  specific_download_link.click(function() {
    var os = $(this).attr("name");
    if (os) {
      var new_pity_link = "/helm/nopay/" + os + "/";
      $(".pity-link").attr("href", new_pity_link);

      var new_return_link = "http://tytel.org/helm/processed/" + os + "/";
      $(".return-link").val(new_return_link);
    }
    showDonate();
    return false;
  });

  var nopay_button = $("#nopay-button");
  nopay_button.click(function() {
    showPity();
    return false;
  });
});
