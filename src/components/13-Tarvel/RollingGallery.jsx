import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import img1 from "../../assets/Banner/one.jpg";
import img2 from "../../assets/Banner/two.jpg";
import img3 from "../../assets/Banner/three.jpg";
import img4 from "../../assets/Banner/four.jpg";
import img5 from "../../assets/Banner/five.jpg";
import img6 from "../../assets/Banner/six.jpg";
import img7 from "../../assets/Banner/seven.jpg";
import img8 from "../../assets/Banner/eight.jpg";
import img9 from "../../assets/Banner/nine.jpg";
import img10 from "../../assets/Banner/ten.jpg";
import img11 from "../../assets/Banner/eleven.jpg";

const IMGS = [
  {
    url: img1,
    description:
      "Renowned for its elegance, pristine slopes, St. Moritz is a destination that defines alpine luxury",
  },
  {
    url: img2,
    description:
      "A hub for freestyle skiing and snowboarding enthusiasts and thrilling terrain. ",
  },
  {
    url: img3,
    description:
      "Known for hosting the World Economic Forum and a vibrant alpine atmosphere.",
  },
  {
    url: img4,
    description:
      "Perfect for families, this resort offers stunning trails, cozy lodges and Lenzerheide via the Urdenbahn cable car. ",
  },
  {
    url: img4,
    description:
      "Famous for its glacier skiing and breathtaking vistas, the world's first rotating cable car. ",
  },
  {
    url: img5,
    description:
      "A hidden gem offering tranquil slopes and exclusivity, Andermatt is part of the largest ski area in Central Switzerland.",
  },
  {
    url: img6,
    description:
      "Reach Täsch for car-free access to Zermatt and impeccable ski terrain.",
  },
  {
    url: img7,
    description:
      "Accessed via Lauterbrunnen, these picturesque car-free villages offer unforgettable alpine experiences and world-class skiing. ",
  },
  {
    url: img8,
    description:
      "A picturesque village with dramatic views and thrilling ski runs, Grindelwald is a favorite for its charm and accessibility to the Jungfrau region. ",
  },
  {
    url: img9,
    description: "Synonymous with upscale sophistication and scenic trails. ",
  },
  {
    url: img10,
    description:
      "Welcoming and diverse, surrounded by a warm alpine village atmosphere. ",
  },
  {
    url: img11,
    description:
      "A unique blend of wellness and skiing, Bad Ragaz is ideal for those seeking relaxation alongside excellent slopes",
  },
];

const RollingGallery = ({
  autoplay = true,
  pauseOnHover = true,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 640 : false
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 2.0;
  const radius = cylinderWidth / (2 * Math.PI);

  // Framer Motion
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[90vh] w-[100%] overflow-hidden bg-gradient-to-b ">
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((item, i) => {
            const imageUrl = typeof item === "string" ? item : item.url;
            const description =
              typeof item === "string" ? `Image ${i + 1}` : item.description;

            return (
              <div
                key={i}
                className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${
                    (360 / faceCount) * i
                  }deg) translateZ(${radius}px)`,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="relative"
                  onClick={() => handleNavigation("/tours")}
                >
                  <img
                    src={imageUrl}
                    alt={description}
                    className="pointer-events-none lg:h-[200px] h-[100px] lg:w-[full] w-[700px] rounded-[8px]  border-[3px] border-white object-cover
                     transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl"
                  />

                  {/* Description overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIndex === i ? 1 : 0,
                      y: hoveredIndex === i ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent
                             rounded-b-[12px] p-3 text-white"
                  >
                    <p className="text-sm font-medium leading-tight sm:text-xs">
                      {description}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        Drag to rotate • Hover for descriptions
      </div>
    </div>
  );
};

export default RollingGallery;
