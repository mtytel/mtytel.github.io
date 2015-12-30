
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

function getOsDownload() {
  var linux32 = "/static/dist/helm_0.6.0-868-ubuntu14.04.1_i386.deb";
  var linux64 = "/static/dist/helm_0.6.0-868-ubuntu14.04.1_amd64.deb";
  var osx = "/static/dist/Helm_v0_6_0.pkg";
  var win32 = "/static/dist/Helm_32bit_v0_6_0.msi";
  var win64 = "/static/dist/Helm_64bit_v0_6_0.msi";

  if (navigator.appVersion.indexOf("Mac") != -1)
    return osx;

  var os_string = null;
  if (navigator.userAgent)
    os_string = navigator.userAgent;
  else if (navigator.oscpu)
    os_string = navigator.oscpu;
  else if (navigator.platform)
    os_string = navigator.platform;

  if (os_string == null)
    return null;

  if (navigator.appVersion.indexOf("Win") != -1) {
    if (os_string.indexOf("64") != -1)
      return win64;
    else
      return win32;
  }
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1) {
    if (os_string.indexOf("64") != -1)
      return linux64;
    else
      return linux32;
  }

  return null;
};
