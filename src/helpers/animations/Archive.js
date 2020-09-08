import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

import { CSS3DRenderer, CSS3DObject } from "../renderers/CSS3DRenderer.js"
import { OrbitControls } from "../controls/OrbitControls.js"

let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100);
let scene = new THREE.Scene();
let renderer = new CSS3DRenderer();
let cameraRailPosition = 0;
let controls = new OrbitControls(camera, renderer.domElement);
let cameraRadius = 1800;
const tilesRadius = 1000;
const tilesSpacing = 1400;
const speedX = 0.175 * tilesSpacing / tilesRadius;
const speedY = 50;
const factor = 1 / 350;

const openMedia = (data) => {
    const title = document.querySelector(".media-title");
    const date = document.querySelector(".media-date")
    const location = document.querySelector(".media-origin")
    title.textContent = data.title;
    date.textContent = data.date;
    location.textContent = data.region;
    if (data.type === "video") {
        const video = document.createElement('video')
        video.className = "media-video plyrVideoPlayer plyr__video-embed"
        const controls = document.createAttribute("controls")
        video.setAttributeNode(controls);
        const source = document.createElement("source")
        const poster = document.createAttribute("poster")
        video.setAttributeNode(poster)
        source.src = `${data.url}#t=100`
        video.appendChild(source)
        let mediaContent = document.querySelector(".media-file");
        mediaContent.appendChild(video)
        // new window.videoPlayer.setup(`.plyrVideoPlayer`)
    } else
        if (data.type === "image") {
            const img = document.createElement('img')
            const imgContainer = document.createElement('div')
            imgContainer.className = "container-img-archive"
            img.className = "media-img"
            img.src = data.url
            let mediaContent = document.querySelector(".media-file");
            mediaContent.appendChild(img)
        }
    let tileOpened = document.querySelector(".open-tile");
    tileOpened.style.opacity = 1;
    tileOpened.style.pointerEvents = "all"
}

let elements = [];


class ArchiveAnimations {
    objects = [];
    targets = { all: [], video: [], helix: [], grid: [] };
    pageX;
    pageY;
    tileLength = 0;

    constructor() {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    calcRail = (i, speedX, speedY) => {
        var y = - (i * speedY);
        var theta = i * speedX + Math.PI;
        return [y, theta]
    }

    transform(targets, duration, type) {
        TWEEN.removeAll();

        if (type === "video") {
            this.objects = targets.video
        }
        for (var i = 0; i < this.objects.length; i++) {

            var object = this.objects[i];
            var target = this.targets[i];
            if (object?.position && target?.position)
                new TWEEN.Tween(object.position)
                    .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();
            if (object?.rotation && target?.rotation)
                new TWEEN.Tween(object.rotation)
                    .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();
        }

        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(this.render)
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
            scene = new THREE.Scene()
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    async animate() {
        await requestAnimationFrame(() => {
            TWEEN.update();
        });

    }


    addEventHandlers() {
        const buttonCloseMediaModal = document.querySelector(".close-media-button")
        let mediaContent = document.querySelector(".media-file");
        let tileOpened = document.querySelector(".open-tile");
        buttonCloseMediaModal.addEventListener("click", () => {
            const layer = document.querySelector(".layer-super");

            tileOpened.style.opacity = 0;
            tileOpened.style.pointerEvents = "none"
            while (mediaContent.children[0]) mediaContent.removeChild(mediaContent.lastChild);
            layer.style.display = "block"
        })
        buttonCloseMediaModal.addEventListener("touchstart", () => {
            const layer = document.querySelector(".layer-super")
            layer.style.display = "block"
            tileOpened.style.opacity = 0;
            tileOpened.style.pointerEvents = "none"
            while (mediaContent.children[0]) mediaContent.removeChild(mediaContent.lastChild);
        })


        var container = document.querySelectorAll('.container')
        container.forEach((e, i) => {
            e.addEventListener("mouseover", () => {
                e.childNodes[0].style.opacity = 1
                cameraRadius = 1400
            })
            e.addEventListener("mouseout", () => {
                e.childNodes[0].style.opacity = 0
            })
        })

        window.addEventListener('resize', this.onWindowResize, false);

    }




    async init(archieves) {
        this.tileLength = archieves.length;

        for (var i = 0; i < archieves.length; i++) {

            /* Create and Open the modal view */

            //??-----------ELEMENTS CREATION ------------------------
            var element = document.createElement('div');
            element.className = `element item-tile-${i} `;
            element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
            var date = document.createElement('div');
            date.className = `date date-${i}`;
            date.innerHTML = ` ${archieves[i].date}`
            element.appendChild(date);
            var container = document.createElement('div');
            container.className = `container container-tile container-tile-${i}`;
            element.appendChild(container);
            const myData = archieves[i];
            element.addEventListener("click", () => openMedia(myData));
            element.addEventListener("touchstart", () => openMedia(myData))
            var details = document.createElement('div');
            details.className = 'details';
            details.innerHTML = archieves[i].origin
            container.appendChild(details);
            var img = document.createElement('img');
            img.src = archieves[i].type === "audio" ? "./assets/img/audio.svg" : archieves[i].url
            img.className = archieves[i].type === "audio" ? "image-tile audio-svg" : "image-tile"
            if (archieves[i].type === "image" || archieves[i].type === "audio") {
                container.appendChild(img)
            }
            var video = document.createElement("video")
            video.className = "video-tile plyrVideoPlayer plyr__video-embed"
            var autoplay = document.createAttribute("autoPlay")
            var loop = document.createAttribute("loop")
            var mute = document.createAttribute("mute")
            var poster = document.createAttribute("poster")
            var preload = document.createAttribute("preload")
            autoplay.value = true
            video.setAttributeNode(loop)
            video.setAttributeNode(poster)
            video.setAttributeNode(mute)
            video.setAttributeNode(preload)
            video.preload = "metadata"
            if (archieves[i].type === "video") {
                container.appendChild(video)
                var source = document.createElement("source")
                source.src = `${archieves[i].url}#t=0.1`
                video.appendChild(source)
            }
            var objectCSS3DObject = new CSS3DObject(element);
            objectCSS3DObject.position.x = Math.random() * 4000 - 2000;
            objectCSS3DObject.position.y = Math.random() * 4000 - 2000;
            objectCSS3DObject.position.z = Math.random() * 4000 - 2000;
            scene.add(objectCSS3DObject);
            elements.push(element);
            this.objects.push(objectCSS3DObject);
            var vector = new THREE.Vector3();
            //---initial helix shape
            var [y, theta] = this.calcRail(i, speedX, speedY)
            var threeObject3dobject = new THREE.Object3D();
            for (var j = 0, l = this.objects.length; j < l; j++) {
                threeObject3dobject.position.setFromCylindricalCoords(tilesRadius, theta, y);
                vector.x = threeObject3dobject.position.x * 2;
                vector.y = threeObject3dobject.position.y;
                vector.z = threeObject3dobject.position.z * 2;
                threeObject3dobject.lookAt(vector);
            }
            this.targets.all.push(threeObject3dobject);
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
        controls.addEventListener('change', this.render);
        camera.position.set(110, 120, 2000);

        //* drag event rotate the camera as in rotate function
        this.dragStart = 0;
        this.dragMove = 0;
        this.deltaX = 0;
        this.burger = true;


        this.transform(this.targets.all, 2000);
        const layer = document.querySelector(".layer-super")
        const rotate = (e) => {
            e.preventDefault();
            var vector = new THREE.Vector3();
            cameraRailPosition += e.deltaY;
            if (cameraRailPosition < 0) {
                cameraRailPosition = 0
            }

            if (cameraRailPosition > (archieves.length - 1) / factor) {
                cameraRailPosition = (archieves.length - 1) / factor
            }
            var [y, theta] = this.calcRail(cameraRailPosition, speedX * factor, speedY * factor)
            camera.position.setFromCylindricalCoords(cameraRadius, theta, y);
            vector.x = 0;
            vector.y = camera.position.y;
            vector.z = 0;
            camera.lookAt(vector);
            controls.target = vector
            controls.update();
        }
        const drag = function (e) {
            e.preventDefault();
            this.pageX = e.pageX
            this.pageY = e.pageY
            var deltaDrag = this.dragMove - this.dragStart;
            if (e.type === "touchstart") {
                this.deltaX = this.dragStart - e.touches[0].pageX;

                const layer = document.querySelector(".layer-super")
                //*tryin to understand if it's a click or drag here
                if (this.deltaX < 30 && this.deltaX > -30) {
                    let divToBeClicked = document.elementFromPoint(this.pageX, this.pageY)
                    layer.style.display = "none"
                    if (divToBeClicked.className === "burger active" && !this.burger) {
                        divToBeClicked.click()
                    }
                    if (divToBeClicked.className !== "burger active" && this.burger) {
                        this.burger = !this.burger
                        divToBeClicked.click()
                    }
                    return
                } else {
                    layer.style.display = "block"
                }
                this.dragStart = e.touches[0].pageX;
            } else if (e.type === "touchmove") {
                this.dragMove = e.touches[0].pageX;
            }
            var vector = new THREE.Vector3();
            cameraRailPosition += deltaDrag;
            var factor = 1 / 5000
            if (cameraRailPosition < 0) {
                cameraRailPosition = 0
            }
            if (cameraRailPosition > (this.tileLength - 1) / factor) {
                cameraRailPosition = (this.tileLength - 1) / factor
            }
            if (this.calcRail === undefined) this.calcRail = (i, speedX, speedY) => {
                var y = - (i * speedY);
                var theta = i * speedX + Math.PI;
                return [y, theta]
            }
            var [y, theta] = this.calcRail(cameraRailPosition, speedX * factor, speedY * factor)
            camera.position.setFromCylindricalCoords(cameraRadius, theta, y);
            vector.x = 0;
            vector.y = camera.position.y;
            vector.z = 0;
            camera.lookAt(vector);
            controls.target = vector

            var skew = Math.max(0, Math.min(20, e.deltaY))

            for (var i = 0; i < elements.length; i++) {
                if (elements[i].style.transform.includes("skewY")) {
                    elements[i].style.transform = elements[i].style.transform.replace(/skewY\([0-9]+deg\)/, `skewY(${skew}deg) `)
                } else {
                    elements[i].style.transform = `${elements[i].style.transform} skewY(${skew}deg)`
                }
            }
            controls.update();
        }


        console.log("rotatefunc", this.rotate)
        window.addEventListener("wheel", rotate, { passive: false })

        //* Trigger scroll and touch tiles to center */
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('wheel', true, true);
        evt.deltaY = +1;
        window.dispatchEvent(evt);

        layer.addEventListener("touchstart", drag, { passive: false })
        layer.addEventListener("touchmove", drag, { passive: false })
        layer.addEventListener("touchend", drag, { passive: false })
        controls.update();

        const destroy = () => {
            window.removeEventListener("wheel", rotate, { passive: false });
            layer.removeEventListener("touchstart", drag, { passive: false })
            layer.removeEventListener("touchmove", drag, { passive: false })
            layer.removeEventListener("touchend", drag, { passive: false })
        }
        return destroy
    }


    /**
     * 
     * @param {Function} destroyFunction 
     * @param {Array} filteredArchieves 
     */
    async performFilteration(destroyFunction, filteredArchieves) {
        let elem = document.getElementById("container");
        while (elem.firstChild) await elem.removeChild(elem.lastChild);
        this.objects = [];
        if (destroyFunction instanceof Function) destroyFunction()
        return this.init(filteredArchieves)
    }
}

const instance = new ArchiveAnimations();
export default instance;