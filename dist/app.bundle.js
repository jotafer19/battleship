(()=>{"use strict";var e={208:(e,t,n)=>{n.d(t,{A:()=>m});var r=n(354),a=n.n(r),o=n(314),i=n.n(o),s=n(417),c=n.n(s),l=new URL(n(258),n.b),A=new URL(n(507),n.b),d=i()(a()),u=c()(l),p=c()(A);d.push([e.id,`@font-face {\n  font-family: 'Orbitron';\n  src: url(${u});\n  font-weight: 600;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Orbitron-Bold';\n  src: url(${p});\n  font-weight: bold;\n  font-style: normal;\n}\n\n:root {\n  --background-color: #cffafe;\n  --button-primary-color: #7dd3fc;\n  --button-secondary-color: #0ea5e9;\n  --cell-hover: #0369a1;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  background-color: var(--background-color);\n}\n\n.header {\n  height: 10svh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Orbitron-Bold';\n  font-size: 3rem;\n  padding: 1rem;\n}\n\n.main {\n  height: 90svh;\n  width: 100svw;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  position: relative;\n  font-family: 'Orbitron';\n}\n\n.game-mode-container {\n  width: 100svw;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 2rem;\n}\n\n.game-mode {\n  width: 200px;\n  height: 100px;\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  font-size: 1.2rem;\n  background-color: var(--button-primary-color);\n  cursor: pointer;\n}\n\n.game-mode:hover {\n  background-color: var(--button-secondary-color);\n}\n\n.game-container {\n  width: 100svw;\n  height: 90svh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.game-logic {\n  width: 100svw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 4rem;\n}\n\n.game-log {\n  width: 100svw;\n  font-size: 1.3rem;\n  padding: 1rem;\n  text-align: center;\n}\n\n.player-one-container,\n.player-two-container {\n  display: flex;\n  gap: 4rem;\n}\n\n.display-name {\n  font-size: 1.3rem;\n  text-align: center;\n  padding: 1rem;\n}\n\n.board {\n  width: 400px;\n  height: 400px;\n  border: 1px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  position: relative;\n  background-color: white;\n}\n\n.cell {\n  height: 40px;\n  width: 40px;\n  border: 1px solid black;\n}\n\n.cell.water {\n  background-color: blue;\n}\n\n.cell.drag-over {\n  border: 2px dashed var(--background-color);\n  background-color: var(--cell-hover);\n}\n\n.ship-container {\n  width: 300px;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  justify-items: center;\n  align-items: center;  \n  gap: 1rem;\n}\n\n.placement-message {\n  padding: 1rem;\n  font-family: 'Orbitron';\n  font-size: 1.3rem;\n  align-self: start;\n}\n\n.ship {\n  background-color: grey;\n  display: grid;\n  grid-auto-flow: column;\n  cursor: move;\n  border-radius: 5rem;\n}\n\n.ship.dragged {\n  background-color: rgb(177, 235, 177);\n}\n\n.ship-part {\n  height: 40px;\n  width: 40px;\n}\n\n#carrier {\n  background-color: #a3e635;\n}\n\n#battleship {\n  background-color: #fbbf24;\n}\n\n#destroyer {\n  background-color: #34d399;\n}\n\n#submarine {\n  background-color: #fb923c;\n}\n\n#patrol {\n  background-color: #dc2626;\n}\n\n.cell.hit {\n  background-color: red;\n}\n\n.cell.miss {\n  background-color: blue;\n}\n\n.controller-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}\n\n.btn {\n  padding: 1rem 2rem;\n  background-color: #fcd34d;\n  border: 1px solid #b45309;\n  font-family: 'Orbitron';\n  font-size: 1.2rem;\n  border-radius: 1rem;\n  cursor: pointer;\n}\n\n.btn:hover {\n  background-color: #f59e0b;\n}\n\n.controller-container .btn {\n  width: 200px;\n}\n\n.winner-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  backdrop-filter: blur(4px);\n}\n\n.display-winner {\n  padding: 2rem;\n  background-color: var(--button-primary-color);\n  border-radius: 1rem;\n  border: 1px solid #075985;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  gap: 2rem;\n}\n\n.winner-message {\n  font-size: 1.3rem;\n}\n\n.change-player-message {\n  font-size: 1.3rem;\n}\n\n.change-player-animation {\n  position:relative;\n}\n\n.loader {\n  border: 6px solid rgba(0, 0, 0, 0.1);\n  border-left-color: #3498db;\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  animation: spin 1s linear infinite;\n  margin: 20% auto;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.countdown {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 1.3rem;\n}\n\n.inactive {\n  display: none;\n}`,"",{version:3,sources:["webpack://./src/style.css"],names:[],mappings:"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",sourcesContent:["@font-face {\n  font-family: 'Orbitron';\n  src: url('./Orbitron-Regular.ttf');\n  font-weight: 600;\n  font-style: normal;\n}\n\n@font-face {\n  font-family: 'Orbitron-Bold';\n  src: url('./Orbitron-Bold.ttf');\n  font-weight: bold;\n  font-style: normal;\n}\n\n:root {\n  --background-color: #cffafe;\n  --button-primary-color: #7dd3fc;\n  --button-secondary-color: #0ea5e9;\n  --cell-hover: #0369a1;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  background-color: var(--background-color);\n}\n\n.header {\n  height: 10svh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: 'Orbitron-Bold';\n  font-size: 3rem;\n  padding: 1rem;\n}\n\n.main {\n  height: 90svh;\n  width: 100svw;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  position: relative;\n  font-family: 'Orbitron';\n}\n\n.game-mode-container {\n  width: 100svw;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 2rem;\n}\n\n.game-mode {\n  width: 200px;\n  height: 100px;\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  font-size: 1.2rem;\n  background-color: var(--button-primary-color);\n  cursor: pointer;\n}\n\n.game-mode:hover {\n  background-color: var(--button-secondary-color);\n}\n\n.game-container {\n  width: 100svw;\n  height: 90svh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.game-logic {\n  width: 100svw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 4rem;\n}\n\n.game-log {\n  width: 100svw;\n  font-size: 1.3rem;\n  padding: 1rem;\n  text-align: center;\n}\n\n.player-one-container,\n.player-two-container {\n  display: flex;\n  gap: 4rem;\n}\n\n.display-name {\n  font-size: 1.3rem;\n  text-align: center;\n  padding: 1rem;\n}\n\n.board {\n  width: 400px;\n  height: 400px;\n  border: 1px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  position: relative;\n  background-color: white;\n}\n\n.cell {\n  height: 40px;\n  width: 40px;\n  border: 1px solid black;\n}\n\n.cell.water {\n  background-color: blue;\n}\n\n.cell.drag-over {\n  border: 2px dashed var(--background-color);\n  background-color: var(--cell-hover);\n}\n\n.ship-container {\n  width: 300px;\n  display: grid;\n  grid-template-rows: repeat(6, 1fr);\n  justify-items: center;\n  align-items: center;  \n  gap: 1rem;\n}\n\n.placement-message {\n  padding: 1rem;\n  font-family: 'Orbitron';\n  font-size: 1.3rem;\n  align-self: start;\n}\n\n.ship {\n  background-color: grey;\n  display: grid;\n  grid-auto-flow: column;\n  cursor: move;\n  border-radius: 5rem;\n}\n\n.ship.dragged {\n  background-color: rgb(177, 235, 177);\n}\n\n.ship-part {\n  height: 40px;\n  width: 40px;\n}\n\n#carrier {\n  background-color: #a3e635;\n}\n\n#battleship {\n  background-color: #fbbf24;\n}\n\n#destroyer {\n  background-color: #34d399;\n}\n\n#submarine {\n  background-color: #fb923c;\n}\n\n#patrol {\n  background-color: #dc2626;\n}\n\n.cell.hit {\n  background-color: red;\n}\n\n.cell.miss {\n  background-color: blue;\n}\n\n.controller-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}\n\n.btn {\n  padding: 1rem 2rem;\n  background-color: #fcd34d;\n  border: 1px solid #b45309;\n  font-family: 'Orbitron';\n  font-size: 1.2rem;\n  border-radius: 1rem;\n  cursor: pointer;\n}\n\n.btn:hover {\n  background-color: #f59e0b;\n}\n\n.controller-container .btn {\n  width: 200px;\n}\n\n.winner-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  backdrop-filter: blur(4px);\n}\n\n.display-winner {\n  padding: 2rem;\n  background-color: var(--button-primary-color);\n  border-radius: 1rem;\n  border: 1px solid #075985;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  gap: 2rem;\n}\n\n.winner-message {\n  font-size: 1.3rem;\n}\n\n.change-player-message {\n  font-size: 1.3rem;\n}\n\n.change-player-animation {\n  position:relative;\n}\n\n.loader {\n  border: 6px solid rgba(0, 0, 0, 0.1);\n  border-left-color: #3498db;\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  animation: spin 1s linear infinite;\n  margin: 20% auto;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.countdown {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 1.3rem;\n}\n\n.inactive {\n  display: none;\n}"],sourceRoot:""}]);const m=d},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var A=[].concat(e[l]);r&&i[A[0]]||(void 0!==o&&(void 0===A[5]||(A[1]="@layer".concat(A[5].length>0?" ".concat(A[5]):""," {").concat(A[1],"}")),A[5]=o),n&&(A[2]?(A[1]="@media ".concat(A[2]," {").concat(A[1],"}"),A[2]=n):A[2]=n),a&&(A[4]?(A[1]="@supports (".concat(A[4],") {").concat(A[1],"}"),A[4]=a):A[4]="".concat(a)),t.push(A))}},t}},417:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},354:e=>{e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),o="/*# ".concat(a," */");return[t].concat([o]).join("\n")}return[t].join("\n")}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},i=[],s=0;s<e.length;s++){var c=e[s],l=r.base?c[0]+r.base:c[0],A=o[l]||0,d="".concat(l," ").concat(A);o[l]=A+1;var u=n(d),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)t[u].references++,t[u].updater(p);else{var m=a(p,r);r.byIndex=s,t.splice(s,0,{identifier:d,updater:m,references:1})}i.push(d)}return i}function a(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var s=n(o[i]);t[s].references--}for(var c=r(e,a),l=0;l<o.length;l++){var A=n(o[l]);0===t[A].references&&(t[A].updater(),t.splice(A,1))}o=c}}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},507:(e,t,n)=>{e.exports=n.p+"a0309d1fe75d16b6f13a.ttf"},258:(e,t,n)=>{e.exports=n.p+"1f498717ba081693370a.ttf"}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var a=r.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=r[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,(()=>{const e=()=>{const e=()=>{const e=document.querySelector(".player-one.board"),t=document.querySelector(".player-two.board");for(let n=0;n<10;n++)for(let r=0;r<10;r++){const a=document.createElement("div");a.classList.add("cell"),a.dataset.row=n,a.dataset.col=r,e.append(a);const o=document.createElement("div");o.classList.add("cell"),o.dataset.row=n,o.dataset.col=r,t.append(o)}},t=()=>{const e=[];return[{name:"carrier",length:5},{name:"battleship",length:4},{name:"destroyer",length:3},{name:"submarine",length:2},{name:"patrol",length:2}].forEach((t=>{const n=document.createElement("div");n.classList.add("ship"),n.setAttribute("id",t.name),n.draggable="true",n.dataset.length=t.length,n.dataset.direction="row";for(let e=0;e<t.length;e++){const e=document.createElement("div");e.classList.add("ship-part"),n.append(e)}e.push(n)})),e},n=(e,t)=>{const[n,r]=t,a=parseInt(e.dataset.length),o=e.dataset.direction,i=[];if("row"===o)for(let e=r;e<r+a;e++)i.push([n,e]);else if("col"===o)for(let e=n;e<n+a;e++)i.push([e,r]);return i},r=(e,t)=>{if(!((e,t)=>{const n=parseInt(e.dataset.length),r=e.dataset.direction,[a,o]=t;if("row"===r){if(o+n-1<0||o+n-1>9)return!1}else if("col"===r&&(a+n-1<0||a+n-1>9))return!1;return!0})(e,t))return!1;const r=n(e,t),a=(()=>{const e=document.querySelectorAll(".active .cell .ship:not(.dragged)"),t=[];return e.forEach((e=>{const r=[parseInt(e.dataset.row),parseInt(e.dataset.col)];n(e,r).forEach((e=>t.push(e)))})),t})();return!a.length||!((e,t)=>{for(let n of e)for(let e of t){const t=Math.abs(n[0]-e[0]),r=Math.abs(n[1]-e[1]);if(t<=1&&r<=1)return!0}return!1})(r,a)},a=e=>{e.dataTransfer.setData("text/plain",e.target.id),e.target.classList.add("dragged")},o=e=>{e.preventDefault(),e.target.classList.toggle("dragged")},i=e=>{e.preventDefault()},s=e=>{const t=e.target.closest(".ship");if(!t.parentNode.classList.contains("cell"))return;const n=[parseInt(t.dataset.row),parseInt(t.dataset.col)],a=t.dataset.direction;t.classList.toggle("dragged"),"row"===a?(t.dataset.direction="col",r(t,n)?t.style.gridAutoFlow="row":t.dataset.direction="row"):"col"===a&&(t.dataset.direction="row",r(t,n)?t.style.gridAutoFlow="column":t.dataset.direction="col"),t.classList.toggle("dragged")},c=e=>{e.preventDefault(),e.target.classList.add("drag-over")},l=e=>{e.preventDefault(),e.target.classList.remove("drag-over")},A=e=>{e.preventDefault();const t=e.target,[n,a]=[parseInt(t.dataset.row),parseInt(t.dataset.col)];t.classList.remove("drag-over");const o=e.dataTransfer.getData("text/plain"),i=document.getElementById(o);try{if(!r(i,[n,a])||t.classList.contains("ship-part"))return;i.style.position="absolute",i.dataset.row=n,i.dataset.col=a,t.append(i)}catch{return}},d=()=>{document.querySelectorAll(".active .ship").forEach((e=>{e.addEventListener("dragstart",a),e.addEventListener("dragend",o),e.addEventListener("click",s)}))},u=()=>{const e=document.querySelector(".active .ship-container");t().forEach((t=>{e.append(t)})),d(),document.querySelectorAll(".active .board .cell").forEach((e=>{e.addEventListener("dragenter",c),e.addEventListener("dragleave",l),e.addEventListener("dragover",i),e.addEventListener("drop",A)}))},p=()=>{const e=document.querySelector(".active .ship-container");document.querySelectorAll(".active .ship").forEach((e=>e.remove())),t().forEach((t=>e.append(t))),d()},m=()=>[Math.floor(10*Math.random()),Math.floor(10*Math.random())],g=()=>{p(),document.querySelectorAll(".active .ship-container .ship").forEach((e=>{(e=>{"col"==(0===Math.floor(2*Math.random())?"row":"col")&&(e.style.gridAutoFlow="row",e.dataset.direction="col")})(e);let[t,n]=m();for(;!r(e,[t,n]);)[t,n]=m();e.style.position="absolute",e.dataset.row=t,e.dataset.col=n,document.querySelector(`.active .cell[data-row="${t}"][data-col="${n}"]`).append(e)}))},h=()=>{const e=document.querySelector(".game-mode-container"),t=document.querySelector(".game-container"),n=document.querySelector(".player-one-container"),r=document.querySelector(".controller-container");e.classList.toggle("inactive"),t.classList.toggle("inactive"),n.classList.toggle("inactive"),n.classList.toggle("active"),r.classList.toggle("inactive")},f=(e,t)=>{const n=document.querySelector(".player-one.display-name"),r=document.querySelector(".player-two.display-name");n.textContent=`${e.name} board`,r.textContent=`${t.name} board`};return{initVsPlayer:(t,n)=>{h(),document.querySelector("button.start-game").classList.toggle("inactive"),f(t,n),e(),u()},initVsComputer:(t,n)=>{h(),document.querySelector("button.next-player").classList.toggle("inactive"),f(t,n),e(),u()},resetBoard:p,placeRandomly:g,changePlayer:()=>{const e=document.querySelector(".player.active"),t=document.querySelector(".player.inactive");e.classList.toggle("active"),e.classList.toggle("inactive"),t.classList.toggle("active"),t.classList.toggle("inactive")},checkShipsPlaced:()=>document.querySelectorAll(".active .cell .ship").length>=5,getShipCoordinates:n,nextPlayerPlacement:()=>{(()=>{const e=document.querySelector(".player-one-container"),t=document.querySelector(".player-two-container"),n=document.querySelector("button.next-player"),r=document.querySelector("button.start-game");e.classList.toggle("active"),e.classList.toggle("inactive"),t.classList.toggle("active"),t.classList.toggle("inactive"),n.classList.toggle("inactive"),r.classList.toggle("inactive")})(),u()},displayWinner:e=>{document.querySelector(".winner-container").classList.toggle("inactive"),document.querySelector(".winner-message").textContent=`${e} wins!`},resetGame:()=>{const e=document.querySelector(".game-mode-container"),t=document.querySelector(".game-container"),n=document.querySelectorAll(".ship-container"),r=document.querySelectorAll(".player"),a=document.querySelector("button.next-player"),o=document.querySelector(".winner-container"),i=document.querySelector(".game-log");e.classList.toggle("inactive"),t.classList.toggle("inactive"),n.forEach((e=>e.classList.toggle("inactive"))),r.forEach((e=>e.classList.toggle("inactive"))),a.classList.toggle("inactive"),o.classList.toggle("inactive"),i.textContent="",document.querySelectorAll(".cell").forEach((e=>e.remove()))},displayBothBoards:()=>{document.querySelector(".player-one-container");const e=document.querySelector(".player-two-container"),t=document.querySelectorAll(".ship-container");e.classList.toggle("inactive"),t.forEach((e=>e.classList.toggle("inactive")))},placeComputerShips:()=>{const e=document.querySelector(".player-one-container"),t=document.querySelector(".player-two-container");e.classList.toggle("active"),t.classList.toggle("active"),g()},vsPlayerDisplayBothBoards:()=>{const e=document.querySelector(".player.active"),t=document.querySelector(".player.inactive");e.classList.toggle("active"),t.classList.toggle("inactive")},displayGameLog:e=>{document.querySelector(".game-log").textContent=`${e.name} turn`}}};class t{constructor(e,t){this.name=e,this.length=t,this.totalHits=0,this.sunk=!1}getHit(){this.totalHits+=1,this.isSunk()}isSunk(){this.sunk=this.totalHits>=this.length}}class r{constructor(){this.board=Array.from({length:10},(()=>Array.from({length:10}).fill(null))),this.ships={}}addShip(e,n,r){const a=new t(e,n);this.ships[e]=a,r.forEach((e=>{const[t,n]=e;this.board[t][n]=a}))}receiveAttack(e){const[t,n]=e;return!!this.board[t][n]&&(this.board[t][n].getHit(),!0)}getShips(){return Object.values(this.ships)}allShipsSunk(){return this.getShips().every((e=>e.sunk))}resetBoard(){this.board=Array.from({length:10},(()=>Array.from({length:10}).fill(null))),this.ships={}}}class a{constructor(e){this.name=e,this.board=new r,this.enemyBoard=null,this.turn=!1}setEnemyBoard(e){this.enemyBoard=e}getBoard(){return this.board}addShip(e,t,n){this.board.addShip(e,t,n)}playerAttack(e){return this.enemyBoard.receiveAttack(e)}checkGameOver(){return this.enemyBoard.allShipsSunk()}reset(){this.board.resetBoard()}}class o extends a{constructor(e){super(e),this.allAttacksDone=[],this.attackHit=!1,this.allHitAttacks=[],this.nextAttack=[]}isAttackAlreadyDone(e){const[t,n]=e;for(let e of this.allAttacksDone)if(e[0]===t&&e[1]===n)return!0;return!1}randomCoordinates(){let e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random());for(;this.isAttackAlreadyDone([e,t]);)e=Math.floor(10*Math.random()),t=Math.floor(10*Math.random());return[e,t]}computerAttacks(){if(this.attackHit&&this.nextAttack.length){if(this.attackHit&&this.nextAttack.length){const e=this.nextAttack.shift();this.allAttacksDone.push(e);const t=this.enemyBoard.receiveAttack(e);if(t)return this.computerHits();if(!t&&!this.nextAttack.length)return this.resetAttackStatus(),!1}}else{this.resetAttackStatus();const e=this.randomComputerAttack();if(e)return this.computerHits();if(!e)return!1}}randomComputerAttack(){const e=this.randomCoordinates();return this.allAttacksDone.push(e),this.enemyBoard.receiveAttack(e)}computerHits(){this.attackHit=!0,this.allHitAttacks.push(this.allAttacksDone.at(-1));const e=this.allHitAttacks.at(-1);if([[1,0],[-1,0],[0,1],[0,-1]].forEach((t=>{const n=t[0]+e[0],r=t[1]+e[1];this.isAttackAlreadyDone([n,r])||n<0||r<0||n>9||r>9||this.nextAttack.push([n,r])})),this.allHitAttacks.length>1){const t=this.allHitAttacks.at(-2);e[0]===t[0]?this.nextAttack=this.nextAttack.filter((t=>t[0]===e[0])):e[1]===t[1]&&(this.nextAttack=this.nextAttack.filter((t=>t[1]===e[1])))}return!0}resetAttackStatus(){this.attackHit=!1,this.allHitAttacks=[],this.nextAttack=[]}getLastCoordinates(){return this.allAttacksDone.at(-1)}}var i=n(72),s=n.n(i),c=n(825),l=n.n(c),A=n(659),d=n.n(A),u=n(56),p=n.n(u),m=n(540),g=n.n(m),h=n(113),f=n.n(h),y=n(208),E={};E.styleTagTransform=f(),E.setAttributes=p(),E.insert=d().bind(null,"head"),E.domAPI=l(),E.insertStyleElement=g(),s()(y.A,E),y.A&&y.A.locals&&y.A.locals;const B=()=>{const e=document.querySelector(".change-player-container"),t=document.querySelector(".game-log"),n=document.querySelector(".game-container");e.classList.toggle("inactive"),t.classList.toggle("inactive"),n.classList.toggle("inactive")};(()=>{const t=e();document.querySelector("button.reset-board").addEventListener("click",t.resetBoard),document.querySelector("button.randomize").addEventListener("click",t.placeRandomly),document.querySelector("button.play-again").addEventListener("click",t.resetGame),document.addEventListener("click",(t=>{t.target.closest(".vs-CPU")?(()=>{const t=new a("Player"),n=new o("Computer");t.setEnemyBoard(n.getBoard()),n.setEnemyBoard(t.getBoard());const r=e();r.initVsComputer(t,n);const i=()=>t.turn?t:n,s=()=>{if(!r.checkShipsPlaced())return;document.querySelectorAll(".active .ship").forEach((e=>{const n=e.id,a=parseInt(e.dataset.length),o=r.getShipCoordinates(e,[parseInt(e.dataset.row),parseInt(e.dataset.col)]);t.addShip(n,a,o),e.remove()})),document.querySelector(".controller-container").classList.toggle("inactive");const e=document.querySelectorAll(".player-two .cell");t.turn=!0,e.forEach((e=>e.addEventListener("click",A))),r.placeComputerShips(),document.querySelectorAll(".active .ship").forEach((e=>{const t=e.id,a=parseInt(e.dataset.length),o=r.getShipCoordinates(e,[parseInt(e.dataset.row),parseInt(e.dataset.col)]);n.addShip(t,a,o),e.remove()})),document.querySelector(".active").classList.toggle("active"),r.displayGameLog(i()),r.displayBothBoards()},c=document.querySelector("button.start-game");c.addEventListener("click",s);const l=()=>{t.turn?(t.turn=!1,n.turn=!0):(t.turn=!0,n.turn=!1)},A=e=>{if(!t.turn)return;if(e.target.classList.contains("hit")||e.target.classList.contains("miss"))return;const a=[parseInt(e.target.dataset.row),parseInt(e.target.dataset.col)],o=t.playerAttack(a);o?(e.target.classList.add("hit"),t.checkGameOver()&&(t.turn=!1,r.displayWinner(t.name),t.reset(),n.reset(),c.removeEventListener("click",s))):o||e.target.classList.add("miss"),l(),r.displayGameLog(i()),setTimeout((()=>{(()=>{if(!n.turn)return;const e=n.computerAttacks(),[a,o]=n.getLastCoordinates(),A=document.querySelector(`.player-one.board .cell[data-row="${a}"][data-col="${o}"]`);e?(A.classList.add("hit"),n.checkGameOver()&&(n.turn=!1,r.displayWinner(n.name),t.reset(),n.reset(),c.removeEventListener("click",s))):e||A.classList.add("miss"),setTimeout((()=>{l(),r.displayGameLog(i())}),1e3)})()}),1e3)}})():t.target.closest(".vs-player")&&(()=>{const t=new a("Player 1"),n=new a("Player 2");t.setEnemyBoard(n.getBoard()),n.setEnemyBoard(t.getBoard());const r=e();r.initVsPlayer(t,n);const o=()=>t.turn?t:n;document.querySelector("button.next-player").addEventListener("click",(()=>{r.checkShipsPlaced()&&(document.querySelectorAll(".active .ship").forEach((e=>{const n=e.id,a=parseInt(e.dataset.length),o=r.getShipCoordinates(e,[parseInt(e.dataset.row),parseInt(e.dataset.col)]);t.addShip(n,a,o),e.remove()})),r.nextPlayerPlacement())}));const i=()=>{if(!r.checkShipsPlaced())return;document.querySelectorAll(".active .ship").forEach((e=>{const t=e.id,a=parseInt(e.dataset.length),o=r.getShipCoordinates(e,[parseInt(e.dataset.row),parseInt(e.dataset.col)]);n.addShip(t,a,o),e.remove()})),document.querySelector(".controller-container").classList.toggle("inactive");const e=document.querySelectorAll(".player-one .cell"),a=document.querySelectorAll(".player-two .cell");document.querySelectorAll(".ship-container").forEach((e=>e.classList.toggle("inactive"))),t.turn=!0,r.displayGameLog(o()),e.forEach((e=>e.addEventListener("click",A))),a.forEach((e=>e.addEventListener("click",l)))},s=document.querySelector("button.start-game");s.addEventListener("click",i);const c=e=>{const a=o();if(e.target.classList.contains("hit")||e.target.classList.contains("miss"))return;const c=[parseInt(e.target.dataset.row),parseInt(e.target.dataset.col)],l=a.playerAttack(c);if(l){if(e.target.classList.add("hit"),a.checkGameOver())return a.turn=!1,r.displayWinner(a.name),r.vsPlayerDisplayBothBoards(),t.reset(),n.reset(),void s.removeEventListener("click",i)}else l||e.target.classList.add("miss");t.turn?(t.turn=!1,n.turn=!0):(t.turn=!0,n.turn=!1),setTimeout((()=>{(()=>{const e=document.querySelector(".countdown");let t=5;const n=setInterval((()=>{t--,e.textContent=t,t<=0&&(clearInterval(n),e.textContent="Change!")}),1e3);e.textContent=5})(),B(),setTimeout((()=>{B(),r.displayGameLog(o()),r.changePlayer()}),6e3)}),1e3)},l=e=>{t.turn&&c(e)},A=e=>{n.turn&&c(e)}})()}))})()})()})();
//# sourceMappingURL=app.bundle.js.map