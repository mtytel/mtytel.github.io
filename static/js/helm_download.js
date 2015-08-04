$(document).ready(function initDownload() {
  var download_link = $("#download-link");
  if (navigator.appVersion.indexOf("Mac") != -1)
    download_link.prop("href", "/static/dist/Helm_v0_4_1.pkg");
  else if (navigator.appVersion.indexOf("Win") != -1) {
    if (navigator.oscpu.indexOf("64") != -1)
      download_link.prop("href", "/static/dist/Helm_64bit_v0_4_1.msi");
    else
      download_link.prop("href", "/static/dist/Helm_32bit_v0_4_1.msi");
  }
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1) {
    if (navigator.oscpu.indexOf("64") != -1)
      download_link.prop("href", "https://code.launchpad.net/~tytel/+archive/ubuntu/helm/+build/7737621/+files/helm_0.4.1-0%7E699%7Eubuntu14.04.1_amd64.deb");
    else
      download_link.prop("href", "https://code.launchpad.net/~tytel/+archive/ubuntu/helm/+build/7737622/+files/helm_0.4.1-0%7E699%7Eubuntu14.04.1_i386.deb");
  }
});
