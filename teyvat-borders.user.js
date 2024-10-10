// ==UserScript==
// @name        Teyvat Borders
// @namespace   https://github.com/nuuull/teyvat-borders
// @match       https://act.hoyolab.com/ys/app/interactive-map*
// @grant       none
// @version     1.0.2
// @author      nuuull, Thiophen
// @description 9/28/2024, 3:31:27 PM
//
// @downloadURL https://raw.githubusercontent.com/nuuull/teyvat-borders/refs/heads/main/teyvat-borders.user.js
// @updateURL   https://raw.githubusercontent.com/nuuull/teyvat-borders/refs/heads/main/teyvat-borders.user.js
// ==/UserScript==

const LIMITS = {
  '-3': {
    x: [2, 9],
    y: [2, 8]
  },
  '-2': {
    x: [4, 18],
    y: [5, 17]
  },
  '-1': {
    x: [8,37],
    y: [10,34]
  },
  0: {
    x: [17,75],
    y: [21,69]
  }
}

const URLS = [
  "https://act-webstatic.hoyoverse.com/map_manage/map/2/",
  "https://raw.githubusercontent.com/nuuull/teyvat-borders/refs/heads/main/2/"
]

const observer = new MutationObserver(() => {
  const container = document.querySelector(".mhy-map-container")

  if (!container) return

  observer.disconnect();

  container.__vue__.$watch("loading", loading => {
    if (loading || container.__vue__.mapData.id != 2) return

    watchImg()

    container.__vue__.$refs.mhyMap.map.on("viewreset", (e) => {
      watchImg()
    })
  })
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

function watchImg() {
  document.querySelectorAll(".leaflet-tile-container > img").forEach(modImg)

  const tileContainer = document.querySelector(".leaflet-tile-container")

  tileContainer.appendChild = (e) => {
    e.childNodes.forEach(modImg)

    tileContainer.append(e)
  }
}

function modImg(el) {
  if (el.dataset.x >= LIMITS[el.dataset.z].x[0] && el.dataset.x <= LIMITS[el.dataset.z].x[1] &&
      el.dataset.y >= LIMITS[el.dataset.z].y[0] && el.dataset.y <= LIMITS[el.dataset.z].y[1]) {
    el.src = el.src.replace(URLS[0], URLS[1])
  }
}
