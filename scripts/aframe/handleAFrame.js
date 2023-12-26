AFRAME.registerComponent("virtual-factory", {
  schema: {
    asset_fac02: {
      type: "string",
      default: images.fac02,
    },
  },
  init: function () {
    const _this = this;
    const sky = document.querySelector("a-sky");
    //Lấy id sky, bỏ kí tự sky_ => lấy được id sky cảnh hiện tại
    const getSkyPic = sky.getAttribute("id").replace("sky_", "");
    document.querySelector("a-scene").addEventListener("loaded", function () {
      _this.loadSceneLazy(getSkyPic);
    });

    //Lấy id cảnh hiện tại để gọi phân cảnh trong a-entity của cảnh hiện tại
    const entityScene = document.getElementById(`entity_${getSkyPic}`);
    entityScene.addEventListener("click", (evt) =>
      this.clickedHostpots(evt, sky, entityScene)
    );
  },
  loadSceneLazy: function (data) {
    if (data in dataAScene) {
      const arrSence = dataAScene[data];
      arrSence.forEach((element) => {
        const getIdAsset = `asset_${element}`;
        // Tạo một phần tử img
        var newImg = document.createElement("img");
        // Đặt các thuộc tính cho phần tử img
        newImg.setAttribute("src", this.data[getIdAsset]);
        newImg.setAttribute("id", getIdAsset);
        // Lấy thẻ <a-assets>
        var aAssets = document.querySelector("a-assets");
        // Thêm phần tử img vào trong <a-assets>
        aAssets.appendChild(newImg);
      });
    }
  },
  clickedHostpots: function (evt, sky, entityScene) {
    const clickedHotspot = evt.target.getAttribute("id");
    // const checkHotspot = clickedHotspot.includes()
    switch (true) {
      case clickedHotspot.includes("question"):
        const handleIdPopup = `popup_${clickedHotspot.replace("image_", "")}`;
        const divPopup = document.getElementById(handleIdPopup);
        if (divPopup) {
          divPopup.classList.add("show");
          divPopup.style.display = "block";
          // Xử lý sự kiện đóng modal khi nhấn nút Close
          var closeButton = divPopup.querySelector(".close");
          closeButton.addEventListener("click", function () {
            divPopup.classList.remove("show");
            divPopup.style.display = "none";
          });
        }
        break;
      case clickedHotspot.includes("_to_"):
        const camera = document.getElementById("camera");
        const getPosClicked = evt.target.getAttribute("position");
        entityScene.setAttribute("visible", false);
        camera.setAttribute(
          "animation",
          `property: position; to: ${getPosClicked.x / 2} 0 ${
            getPosClicked.z / 2
          }; dur: 500; easing: linear;`
        );
        sky.setAttribute(
          "animation",
          `property: material.opacity; to: 0; dur: 500; easing: linear;`
        );
        const getIdSkyToNext = `sky_${clickedHotspot.split("_to_")[1]}`;
        sky.setAttribute("id", getIdSkyToNext);
        setTimeout(() => {
          const getAssetSkyToNext = `asset_${clickedHotspot.split("_to_")[1]}`;
          if (
            document.getElementById(`asset_${clickedHotspot.split("_to_")[1]}`)
          ) {
            sky.setAttribute("src", `#${getAssetSkyToNext}`);
            sky.setAttribute(
              "animation",
              `property: material.opacity; to: 1; dur: 500; easing: linear;`
            );
          } else {
            sky.setAttribute("src", this.data[getAssetSkyToNext]);
            sky.setAttribute(
              "animation",
              `property: material.opacity; to: 1; dur: 500; easing: linear;`
            );
          }
          const getIdEntityToNext = `entity_${clickedHotspot.split("_to_")[1]}`;
          document
            .getElementById(getIdEntityToNext)
            .setAttribute("visible", true);
        }, 500);
        setTimeout(() => {
          camera.setAttribute(
            "animation",
            `property: position; to: 0 0 0; dur: 500; easing: linear;`
          );
        }, 800);
        this.init();
        break;
      default:
        console.log("Không khớp với bất kỳ trường hợp nào");
    }
  },
});
