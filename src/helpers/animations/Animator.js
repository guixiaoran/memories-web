import ScrollMagic from 'scrollmagic';
import { gsap } from "gsap/all";
import SplitText from "react-splittext";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TweenMax } from "gsap";

let mouse = document.querySelector(".cursor");

class Animator {
    controller;
    slideScene;
    pageScene;
    detailScene;
    landingTextScene;
    slideTextLanding;
    burger = document.querySelector(".burger");
    nav = document.querySelector(".nav-bar");
    root = document.getElementById("root");

    activeCursor(e) {
        mouse = document.querySelector(".cursor")
        const item = e.target;
        if (item.id === "logo" || item.classList.contains("burger")) {
            mouse.classList.add("nav-active")
        } else {
            mouse.classList.remove("nav-active")
        }

        if (item.classList.contains("explore")) {
            gsap.to(".title-swipe", .5, { y: "100%" })
            mouse.classList.add("explore-active")
        } else {
            mouse.classList.remove("explore-active")
            gsap.to(".title-swipe", .5, { y: "0%" })
        }
    }

    navToggle(e) {
        this.root = document.getElementById("root");

        if (!e.target.classList.contains("active")) {
            e.target.classList.add("active")
            gsap.to(".line1", 0.3, { rotate: "45", y: 5, background: "black" });
            gsap.to(".line2", 0.3, { rotate: "-45", y: -5, background: "black" });
            gsap.to(".nav-bar", .75, { clipPath: "circle(4500px at 100% -10%)" })
            gsap.to("#logo", 1, { color: "black" })
            this.root.classList.add("hide")
            document.getElementById("logo").style.display = "none"
        } else {
            e.target.classList.remove("active")
            gsap.to(".line1", 0.3, { rotate: "0", y: 0, background: "white" });
            gsap.to(".line2", 0.3, { rotate: "0", y: 0, background: "white" });
            gsap.to(".nav-bar", .75, { clipPath: "circle(50px at 100% -10%)" })
            gsap.to("#logo", 1, { color: "white" })
            document.getElementById("logo").style.display = "block"
            this.root.classList.remove("hide")
        }
    }
    navToggle2(e) {
        this.root = document.getElementById("root");
        if (e.target.classList.contains("active")) {
            gsap.to(".line1", 0.3, { rotate: "45", y: 5, background: "black" });
            gsap.to(".line2", 0.3, { rotate: "-45", y: -5, background: "black" });
            gsap.to(".nav-bar", .75, { clipPath: "circle(4500px at 100% -10%)" })
            gsap.to("#logo", 1, { color: "black" })
            document.getElementById("logo").style.display = "none"
            this.root.classList.add("hide")
        } else {
            this.burger = document.querySelector(".burger");
            this.burger.classList.remove("active")
            gsap.to(".line1", 0.3, { rotate: "0", y: 0, background: "white" });
            gsap.to(".line2", 0.3, { rotate: "0", y: 0, background: "white" });
            gsap.to(".nav-bar", .75, { clipPath: "circle(50px at 100% -10%)" })
            gsap.to("#logo", 1, { color: "white" })
            document.getElementById("logo").style.display = "block";
            this.root.classList.remove("hide")
        }
    }

    animateSlides(videoPlayerClassName) {
        //Init Controller
        if (this.controller === undefined) this.controller = new ScrollMagic.Controller();
        const sliders = document.querySelectorAll(".slide");
        //Loop over each sllide
        sliders.forEach((slide, index, slides) => {
            const revealImg = slide.querySelector(".reveal-img");
            const img = slide.querySelector(`.${videoPlayerClassName}`);
            const revealText = slide.querySelector(".reveal-text");
            //GSAP
            const slideTl = gsap.timeline({
                defaults: { duration: 1, ease: "power2.inOut" }
            });
            slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
            slideTl.fromTo(img, { opacity: 0, scale: 2 }, { scale: 1, opacity: 1 }, "-=.5");
            slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
            //Create Scene
            this.slideScene = new ScrollMagic.Scene({
                triggerElement: slide,
                triggerHook: 0.25,
                reverse: true
            })
                .setTween(slideTl)
                .addTo(this.controller);

            //New Animation
            const pageTl = gsap.timeline();

            let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];

            pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
            pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
            pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
            //Create new scene
            this.pageScene = new ScrollMagic.Scene({
                triggerElement: slide,
                duration: "100%",
                triggerHook: 0
            }).setPin(slide, { pushFollowers: false })
                .setTween(pageTl)
                .addTo(this.controller);
        });
    }

    enter() {
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
            ".swipe",
            .5,
            { x: "0%" },

            { x: "100%", stagger: 0.2 }
        );
        tl.fromTo(
            ".nav-header",
            1,
            { y: "-100%" },
            { y: "0%", ease: "power2.inOut" },
            "-=1.5"
        );
    }

    exit() {
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
            ".swipe",
            0.5,
            { x: "-100%" },
            { x: "0%" },
            "-=0.5"
        );
        tl.fromTo(
            ".nav-header",
            1,
            { y: "-100%" },
            { y: "0%", ease: "power2.inOut" },
            "-=1.5"
        );
    }

    init() {
        gsap.registerPlugin(TweenMax);
        //init controller
        this.controller = new ScrollMagic.Controller();
        // Select elements
        const text = document.querySelector(".text-split")
        const heroSection = document.querySelectorAll(".parallax");
        const heroSection1 = document.querySelectorAll(".parallax1");

        //split text helper
        var split = new SplitText(text, { type: "words", duration: 1 });

        //gsap
        const splitWords = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" }
        });

        splitWords.to(heroSection, { duration: 1, y: ".5%" });
        splitWords.to(heroSection1, { duration: 1, y: "-25%" }, "-=1");
        splitWords.fromTo(split.words, { y: "-60%", opacity: 0 }, { y: "20%", opacity: 1, stagger: .09, scale: 1 }, "-=1");

        //Create Scene
        this.slideTextLanding = new ScrollMagic.Scene({
            duration: "40%",
            triggerElement: text,
            triggerHook: 0.85,
            reverse: true
        }).setTween(splitWords).addTo(this.controller);
        this.enter();
    }



    detailAnimation = () => {
        gsap.registerPlugin(ScrollTrigger);
        let slides = document.querySelectorAll(".detail-slide");
        slides.forEach((slide, index, slides) => {
            let slideTl = gsap.timeline(
                {
                    defaults: {
                        duration: 1
                    },
                    scrollTrigger: {
                        trigger: slides[index],
                        start: "center top",
                        toggleActions: "play none resume reverse",
                    },
                }
            )
            let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];

            slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 })
            slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
        });
    }

    memoryAnimation = () => {
        if (window.innerWidth > 600) {
            gsap.registerPlugin(ScrollTrigger);
            let medias = document.querySelectorAll(".memory-img")
            let textBoxes = document.querySelectorAll(".memory-text");
            let title = document.querySelectorAll(".text-memory-title")
            let title2 = document.querySelectorAll(".text-memory-2-title")
            let date = document.querySelectorAll(".memory-nr")
            let tl = gsap.timeline(
                {
                    defaults: {
                        duration: .5
                    },
                    scrollTrigger: {
                        trigger: textBoxes[0],
                        start: "center 80%",
                        toggleActions: "play pause resume reverse",
                    },
                })
            let tl2 = gsap.timeline(
                {
                    defaults: {
                        duration: 2
                    },
                    scrollTrigger: {
                        trigger: date,
                        start: "bottom 40%",
                        toggleActions: "play none resume reverse",
                    },
                })
            let tl3 = gsap.timeline(
                {
                    defaults: {
                        duration: 1
                    },
                    scrollTrigger: {
                        trigger: medias[1],
                        start: "center center",
                        toggleActions: "play none resume reverse",
                    },
                }
            )
            tl.fromTo(title, { opacity: 0, y: -200, scale: 1 }, { opacity: 1, yPercent: -50, scale: 2 })
                .fromTo(textBoxes[0], { opacity: 0, yPercent: 0 }, { opacity: 1, yPercent: -30 })
                .fromTo(medias[0], { opacity: 1, yPercent: 0 }, { opacity: 0, yPercent: -30 }, "-=1.5")
                .fromTo(date[0], { opacity: 0, xPercent: 100 }, { opacity: 1, xPercent: 0 }, "-=1.8")

            tl2.fromTo(medias[1], { opacity: 0 }, { opacity: 1 })

            tl3.fromTo(medias[1], { opacity: 1 }, { opacity: 0 })
                .fromTo(title2, { opacity: 0, scale: 1 }, { opacity: 1, transform: "translateY(-50vh)", scale: 2 })
                .fromTo(textBoxes[1], { opacity: 0, }, { opacity: 1, transform: "translateY(-50vh)" })
                .fromTo(date[1], { opacity: 0, xPercent: 100 }, { opacity: 1, xPercent: 0 }, "-=1.8")
        }
    }

    destroy() {
        this.exit();
        window.location.hash = ""
        if (this?.slideTextLanding?.destroy instanceof Function) this.slideTextLanding.destroy();
        if (this?.detailScene?.destroy instanceof Function) this.detailScene.destroy();
        if (this?.controller?.destroy instanceof Function)
            this.controller.destroy();
    }


}
const instance = new Animator();
export default instance;