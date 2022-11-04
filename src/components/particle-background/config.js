export const option = {
    fpsLimit: 60,
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 1,
            random: false
        },
        size: {
            value: 50,
            random: true
        },
        lineLinked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 1,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onHover: {
                enable: true,
                mode: "bubble"
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                lineLinked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 200,
                duration: 2,
                opacity: 1,
                speed: 3
            },
            repulse: {
                distance: 200
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    backgroundMask: {
        enable: true,
        cover: {
            value: {
                r: 255,
                g: 255,
                b: 255
            }
        }
    },
    // fullscreen: false,
    retina_detect: true
}