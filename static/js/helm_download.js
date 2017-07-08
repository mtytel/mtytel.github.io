
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

var download_lookup = {};
download_lookup.linux32_r = "/static/dist/helm_0.9.0_i386_r.deb";
download_lookup.linux32_ty = "/static/dist/helm_0.9.0_i386_ty.deb";
download_lookup.linux64_r = "/static/dist/helm_0.9.0_amd64_r.deb";
download_lookup.linux64_ty = "/static/dist/helm_0.9.0_amd64_ty.deb";
download_lookup.linux_arm64_r = "/static/dist/helm_0.9.0_arm64_r.deb";
download_lookup.linux_arm64_ty = "/static/dist/helm_0.9.0_arm64_ty.deb";
download_lookup.linux_armhf_r = "/static/dist/helm_0.9.0_armhf_r.deb";
download_lookup.linux_armhf_ty = "/static/dist/helm_0.9.0_armhf_ty.deb";
download_lookup.osx_r = "/static/dist/Helm_v0_9_0_r.pkg";
download_lookup.osx_ty = "/static/dist/Helm_v0_9_0_ty.pkg";
download_lookup.win32_r = "/static/dist/Helm_32bit_v0_9_0_r.msi";
download_lookup.win32_ty = "/static/dist/Helm_32bit_v0_9_0_ty.msi";
download_lookup.win64_r = "/static/dist/Helm_64bit_v0_9_0_r.msi";
download_lookup.win64_ty = "/static/dist/Helm_64bit_v0_9_0_ty.msi";

function getOs() {
  if (navigator.appVersion.indexOf("Mac") != -1)
    return "osx";

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
      return "win64";
    else
      return "win32";
  }
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1) {
    if (os_string.indexOf("aarch64") != -1)
      return "linux_arm64";
    if (os_string.indexOf("64") != -1)
      return "linux64";
    if (os_string.indexOf("armv7l") != -1 || os_string.indexOf("armhf") != -1)
      return "linux_armhf"
    return "linux32";
  }

  return null;
}

function lookupDownload(os, paid) {
  if (paid)
    return download_lookup[os + "_ty"];

  return download_lookup[os + "_r"];
}

function getOsDownload(paid) {
  return lookupDownload(getOs());
};
