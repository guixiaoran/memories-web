import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import Plyr from 'plyr';

import { CSS3DRenderer, CSS3DObject } from "../renderers/CSS3DRenderer.js";
import { OrbitControls } from "../controls/OrbitControls.js";

let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
let scene = new THREE.Scene();
let renderer = new CSS3DRenderer();
let cameraRailPosition = 0;
let controls = new OrbitControls(camera, renderer.domElement);
let cameraRadius = 1800;
let objects = [];
let targets = { all: [], video: [], helix: [], grid: [] };
let globalPlayerVariable;
const tilesRadius = 1000;
const tilesSpacing = 1400;
const speedX = 0.175 * tilesSpacing / tilesRadius;
const speedY = 50;
const factor = 1 / 350;

const removeElementUsingId = (id) => {
  const elementToRemove = document.getElementById(id);
  if (elementToRemove) elementToRemove.parentElement.removeChild(elementToRemove);
};

const createElementFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

const openMedia = (data) => {
  document.getElementById('filterButtons').style.display = 'none';
  const title = document.querySelector(".media-title");
  const date = document.querySelector(".media-date");
  const location = document.querySelector(".media-origin");
  title.textContent = data.title;
  date.textContent = data.date;
  location.textContent = data.region;
  let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  if (data.type === "video") {
    const video = document.createElement('video');
    video.className = "media-video";
    video.id = id;
    const controls = document.createAttribute("controls");
    const playsinline = document.createAttribute("playsinline");
    video.setAttributeNode(controls);
    video.setAttributeNode(playsinline);
    const source = document.createElement("source");
    source.src = `${data.url}`;
    video.appendChild(source);
    let mediaContent = document.querySelector(".media-file");
    mediaContent.appendChild(video);
  } else if (data.type === 'audio') {
    const audio = document.createElement('audio');
    audio.id = id;
    const source = document.createElement("source");
    source.src = `${data.url}`;
    audio.appendChild(source);
    let mediaContent = document.querySelector(".media-file");
    mediaContent.appendChild(audio);
    globalPlayerVariable = new Plyr(audio, {
      playsinline: true,
      clickToPlay: false,
      controls: ["play", "progress", "fullscreen", "settings"],
      fullscreen: {
        iosNative: true
      }
    });
  } else if (data.type === "image") {
    const img = document.createElement('img');
    const imgContainer = document.createElement('div');
    imgContainer.className = "container-img-archive";
    img.className = "media-img";
    img.src = data.url;
    let mediaContent = document.querySelector(".media-file");
    mediaContent.appendChild(img);
  }
  const box = document.getElementById('content');
  const contentDIV = document.createElement('div');
  contentDIV.id = "HTMLcontent";
  contentDIV.appendChild(createElementFromHTML(data.content));
  box.appendChild(contentDIV);
  let tileOpened = document.querySelector(".open-tile");
  tileOpened.style.opacity = 1;
  tileOpened.style.pointerEvents = "all";
};

let elements = [];

const animateGlobal = () => {
  requestAnimationFrame(animateGlobal);
  TWEEN.update();
};

class ArchiveAnimations {
  constructor() {
    this.tileLength = 0;
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  calcRail(i, speedX, speedY) {
    var y = - (i * speedY);
    var theta = i * speedX + Math.PI;
    return [y, theta];
  }

  transform(targets, duration, type) {
    TWEEN.removeAll();

    if (type === "video") {
      objects = targets.video;
    }
    for (var i = 0; i < objects.length; i++) {

      var object = objects[i];
      var target = targets[i];
      new TWEEN.Tween(object.position)
        .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      new TWEEN.Tween(object.rotation)
        .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    }

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(() => {
        renderer.render(scene, camera);
      })
      .start();
  }


  loadCamera() {
    if (camera === undefined)
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);

  }

  loadRenderer() {
    if (renderer === undefined)
      renderer = new CSS3DRenderer();
  }

  render() {
    renderer.render(scene, camera);
  }


  onWindowResize() {
    if (renderer === undefined) {
      renderer = new CSS3DRenderer();
    }
    if (camera === undefined) {
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
    }
    if (scene === undefined)
      scene = new THREE.Scene();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }




  addEventHandlers() {
    const buttonCloseMediaModal = document.querySelector(".close-media-button");
    let mediaContent = document.querySelector(".media-file");
    let tileOpened = document.querySelector(".open-tile");
    buttonCloseMediaModal.addEventListener("click", () => {
      const layer = document.querySelector(".layer-super");
      if (globalPlayerVariable) if (globalPlayerVariable.destroy instanceof Function) globalPlayerVariable.destroy();
      tileOpened.style.opacity = 0;
      tileOpened.style.pointerEvents = "none";
      while (mediaContent.children[0]) mediaContent.removeChild(mediaContent.lastChild);
      layer.style.display = "block";
      removeElementUsingId("HTMLcontent");
      document.getElementById('filterButtons').style.display = 'flex';
    });
    buttonCloseMediaModal.addEventListener("touchstart", () => {
      const layer = document.querySelector(".layer-super");
      if (globalPlayerVariable) if (globalPlayerVariable.destroy instanceof Function) globalPlayerVariable.destroy();
      layer.style.display = "block";
      tileOpened.style.opacity = 0;
      tileOpened.style.pointerEvents = "none";
      while (mediaContent.children[0]) mediaContent.removeChild(mediaContent.lastChild);
    });


    var container = document.querySelectorAll('.container');
    container.forEach((e) => {
      e.addEventListener("mouseover", () => {
        e.childNodes[0].style.opacity = 1;
        cameraRadius = 1400;
      });
      e.addEventListener("mouseout", () => {
        e.childNodes[0].style.opacity = 0;
      });
    });

    window.addEventListener('resize', this.onWindowResize, false);

  }

  animate() {
    animateGlobal();
  }

  createExternalDiv(index) {
    var element = document.createElement('div');
    element.className = `element item-tile-${index} `;
    element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
    return element;
  }

  createDateComponent(archieves, index) {
    var date = document.createElement('div');
    date.className = `date date-${index}`;
    date.innerHTML = ` ${archieves[index].date}`;
    return date;
  }

  createContainer(i) {
    var container = document.createElement('div');
    container.className = `container container-tile container-tile-${i}`;
    return container;
  }

  /**
  * 
  * @param {Array} archieves 
  */
  async init(archieves, sendCurrentTileIndex) {
    this.tileLength = archieves.length;
    document.getElementById('container').innerHTML = "";
    for (var i = 0; i < this.tileLength; i++) {

      /* Create and Open the modal view */

      //??-----------ELEMENTS CREATION ------------------------
      var element = this.createExternalDiv(i);
      var date = this.createDateComponent(archieves, i);
      element.appendChild(date);
      var container = this.createContainer(i);
      element.appendChild(container);

      const myData = archieves[i];

      element.addEventListener("click", () => openMedia(myData));
      element.addEventListener("touchstart", () => openMedia(myData));

      var details = document.createElement('div');
      details.className = 'details';
      details.innerHTML = archieves[i].origin;
      container.appendChild(details);


      var img = document.createElement('img');
      img.src = archieves[i].type === "audio" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1200px-Speaker_Icon.svg.png" : archieves[i].url;
      img.className = archieves[i].type === "audio" ? "image-tile audio-svg" : "image-tile";
      if (archieves[i].type === "image" || archieves[i].type === "audio") {
        container.appendChild(img);
      }
      var video = document.createElement("video");
      video.className = "video-tile";
      var autoplay = document.createAttribute("autoPlay");
      var loop = document.createAttribute("loop");
      var mute = document.createAttribute("mute");
      var poster = document.createAttribute("poster");
      var preload = document.createAttribute("preload");
      autoplay.value = true;
      video.setAttributeNode(loop);
      video.setAttributeNode(poster);
      video.setAttributeNode(mute);
      video.setAttributeNode(preload);
      video.preload = "metadata";
      if (archieves[i].type === "video") {
        container.appendChild(video);
        var source = document.createElement("source");
        source.src = `${archieves[i].url}#t=0.1`;
        video.appendChild(source);
      }
      var objectCSS3DObject = new CSS3DObject(element);
      objectCSS3DObject.position.x = Math.random() * 4000 - 2000;
      objectCSS3DObject.position.y = Math.random() * 4000 - 2000;
      objectCSS3DObject.position.z = Math.random() * 4000 - 2000;

      scene.add(objectCSS3DObject);
      elements.push(element);
      objects.push(objectCSS3DObject);
      var vector = new THREE.Vector3();
      //---initial helix shape
      const y = - (i * speedY);
      const theta = i * speedX + Math.PI;
      var threeObject3dobject = new THREE.Object3D();
      for (var j = 0, l = objects.length; j < l; j++) {
        threeObject3dobject.position.setFromCylindricalCoords(tilesRadius, theta, y);
        vector.x = threeObject3dobject.position.x * 2;
        vector.y = threeObject3dobject.position.y;
        vector.z = threeObject3dobject.position.z * 2;
        threeObject3dobject.lookAt(vector);
      }
      targets.all.push(threeObject3dobject);
    }
    //??--------------RENDERS ------------  ------------------------------------//
    this.loadRenderer();
    document.getElementById('container').appendChild(renderer.domElement);
    //??--------------CONTROLS ------------------------------------------------//
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.minDistance = cameraRadius;
    controls.maxDistance = cameraRadius;
    //lock change vertical angle
    controls.minPolarAngle = Math.PI / 2; // radians
    controls.maxPolarAngle = Math.PI / 2; // radians
    //lock zoom
    controls.enableZoom = false;
    controls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });
    camera.position.set(0, 0, 500);

    //* drag event rotate the camera as in rotate function
    this.dragStart = 0;
    this.dragMove = 0;
    this.deltaX = 0;
    this.burger = true;


    this.transform(targets.all, 2000);
    const rotate = (e) => {
      e.preventDefault();
      var vector = new THREE.Vector3();
      cameraRailPosition += e.deltaY;
      if (cameraRailPosition < 0) {
        cameraRailPosition = 0;
      }

      if (cameraRailPosition > (archieves.length - 1) / factor) {
        cameraRailPosition = (archieves.length - 1) / factor;
      }
      var y = - (cameraRailPosition * speedY * factor);
      var theta = cameraRailPosition * (speedX * factor) + Math.PI;
      camera.position.setFromCylindricalCoords(cameraRadius, theta, y);
      vector.x = 0;
      vector.y = camera.position.y;
      vector.z = 0;
      camera.lookAt(vector);
      controls.target = vector;
      const oneTileVectorSize = -33;
      let tileIndex = Math.floor(vector.y / oneTileVectorSize);
      if (sendCurrentTileIndex instanceof Function) sendCurrentTileIndex(tileIndex);

      controls.update();
    };

    window.addEventListener("wheel", rotate, { passive: false });

    //* Trigger scroll and touch tiles to center */
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('wheel', true, true);
    evt.deltaY = +1;
    window.dispatchEvent(evt);
    controls.update();

    const destroy = () => {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      window.removeEventListener("wheel", rotate, { passive: false });
    };
    return destroy;
  }


  /**
       * 
       * @param {Function} destroyFunction 
       * @param {Array} filteredArchieves 
       */
  async performFilteration(destroyFunction, filteredArchieves, sendCurrentTileIndex) {
    if (destroyFunction instanceof Function) destroyFunction();
    document.getElementById("container").innerHTML = "";
    objects = [];
    return this.init(filteredArchieves, sendCurrentTileIndex);
  }
}

const instance = new ArchiveAnimations();
export default instance;