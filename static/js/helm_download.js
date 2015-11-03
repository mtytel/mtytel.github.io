
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

$(document).ready(function initDownload() {
  var download_link = $("#download-link");
  if (navigator.appVersion.indexOf("Mac") != -1)
    download_link.prop("href", "/static/dist/Helm_v0_5_0.pkg");
  else if (navigator.appVersion.indexOf("Win") != -1) {
    if (navigator.oscpu) {
      if (navigator.oscpu.indexOf("64") != -1)
        download_link.prop("href", "/static/dist/Helm_64bit_v0_5_0.msi");
      else
        download_link.prop("href", "/static/dist/Helm_32bit_v0_5_0.msi");
    }
    else {
      if (navigator.platform.indexOf("64") != -1)
        download_link.prop("href", "/static/dist/Helm_64bit_v0_5_0.msi");
      else
        download_link.prop("href", "/static/dist/Helm_32bit_v0_5_0.msi");
    }
  }
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1) {
    if (navigator.oscpu) {
      if (navigator.oscpu.indexOf("64") != -1)
        download_link.prop("href", "/static/dist/helm_0.5.0-778~ubuntu14.04.1_amd64.deb");
      else
        download_link.prop("href", "/static/dist/helm_0.5.0-778~ubuntu14.04.1_i386.deb");
    }
    else {
      if (navigator.platform.indexOf("64") != -1)
        download_link.prop("href", "/static/dist/helm_0.5.0-778~ubuntu14.04.1_amd64.deb");
      else
        download_link.prop("href", "/static/dist/helm_0.5.0-778~ubuntu14.04.1_i386.deb");
    }
  }
});
