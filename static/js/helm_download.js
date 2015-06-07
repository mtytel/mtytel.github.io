$(document).ready(function initDownload() {
  var download_link = $("#download-link");
  if (navigator.appVersion.indexOf("Mac") != -1)
    download_link.prop("href", "/static/dist/Helm.pkg");
  else if (navigator.appVersion.indexOf("Win") != -1) {
    if (navigator.appVersion.indexOf("64") != -1)
      download_link.prop("href", "/static/dist/Twytch32.msi");
    else
      download_link.prop("href", "/static/dist/Twytch32.msi");
  }
  else if (navigator.appVersion.indexOf("X11") != -1 ||
           navigator.appVersion.indexOf("Linux") != -1) {
    if (navigator.appVersion.indexOf("64") != -1)
      download_link.prop("href", "https://launchpad.net/~tytel/+archive/ubuntu/helm/+build/7515554/+files/helm_0.2-1_amd64.deb");
    else
      download_link.prop("href", "https://launchpad.net/~tytel/+archive/ubuntu/helm/+build/7515555/+files/helm_0.2-1_i386.deb");
  }
});
