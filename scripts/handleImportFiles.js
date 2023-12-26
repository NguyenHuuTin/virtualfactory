fetch("../components/html2D/index.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("html2D").innerHTML = data;
  });
fetch("../components/html2D/components/fac01.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("html_fac01").innerHTML = data;
  });
fetch("../components/html3D/index.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("html3D").innerHTML = data;
  });
