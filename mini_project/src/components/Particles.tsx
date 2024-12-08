import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: any) => {
        await console.log(container);
    }, []);

    return (
        <Particles
            className="fixed inset-0 z-[-1]"
            id="tsparticles"
            init={particlesInit}
            options={{
                // Customize particle options here
                background: {
                    color: {
                      value: "#1E2F97",
                    },
                  },
                  fpsLimit: 120,
                  interactivity: {
                    events: {
                      onClick: {
                        enable: true,
                        mode: "repulse",
                      },
                      onHover: {
                        enable: true,
                        mode: 'grab',
                      },
                    },
                    modes: {
                      push: {
                        distance: 200,
                        duration: 15,
                      },
                      grab: {
                        distance: 150,
                      },
                    },
                  },
                  particles: {
                    color: {
                      value: "#FFFFFF",
                    },
                    links: {
                      color: "#FFFFFF",
                      distance: 150,
                      enable: true,
                      opacity: 0.3,
                      width: 1,
                    },
                    move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                        default: "bounce",
                      },
                      random: true,
                      speed: 1,
                      straight: false,
                    },
                    number: {
                      density: {
                        enable: true,
                      },
                      value: 150,
                    },
                    opacity: {
                      value: 1.0,
                    },
                    shape: {
                      type: "circle",
                    },
                    size: {
                      value: { min: 1, max: 3 },
                    },
                  },
                  detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;