"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SpectacularThemeToggleProps {
  isDarkMode: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

export default function CustomThemeToggle({ isDarkMode, size = "lg" }: SpectacularThemeToggleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Determinar tamaños basados en la prop size
  const dimensions = {
    sm: { container: "w-16 h-16", mainObject: "w-8 h-8", particles: 8 },
    md: { container: "w-20 h-20", mainObject: "w-10 h-10", particles: 12 },
    lg: { container: "w-24 h-24", mainObject: "w-12 h-12", particles: 16 },
    xl: { container: "w-32 h-32", mainObject: "w-16 h-16", particles: 24 },
  }[size]

  // Variantes para las animaciones
  const containerVariants = {
    light: {
      background: "linear-gradient(135deg, #fef9c3 0%, #fde68a 50%, #fcd34d 100%)",
    },
    dark: {
      background: "linear-gradient(135deg, #0c0a20 0%, #1e1b4b 50%, #312e81 100%)",
    },
    pressed: {
      scale: 0.95,
    },
  }

  // Partículas para el sol
  const sunParticles = Array.from({ length: dimensions.particles }).map((_, i) => {
    const angle = i * (360 / dimensions.particles) * (Math.PI / 180)
    const distance = Number.parseInt(dimensions.mainObject.split("w-")[1]) * 1.5
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    return { id: i, x, y, angle }
  })

  // Estrellas para el modo oscuro
  const stars = Array.from({ length: dimensions.particles * 2 }).map((_, i) => {
    return {
      id: i,
      x: Math.random() * 140 - 70,
      y: Math.random() * 140 - 70,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: 1 + Math.random() * 3,
    }
  })

  // Nubes para el modo claro
  const clouds = Array.from({ length: 5 }).map((_, i) => {
    return {
      id: i,
      x: (Math.random() * 140 - 70) * 0.8,
      y: (Math.random() * 140 - 70) * 0.8,
      width: 20 + Math.random() * 30,
      height: 10 + Math.random() * 10,
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 20,
      direction: Math.random() > 0.5 ? 1 : -1,
    }
  })

  return (
    <motion.div
      className={`relative ${dimensions.container} rounded-full flex items-center justify-center overflow-hidden`}
      variants={containerVariants}
      animate={[isDarkMode ? "dark" : "light", isPressed ? "pressed" : ""]}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      whileHover={{ scale: 1.05 }}
    >
      {/* Fondo con gradiente animado y efectos de partículas */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(49,46,129,0.1) 50%, rgba(15,23,42,0) 100%)"
            : "radial-gradient(circle, rgba(254,240,138,0.5) 0%, rgba(253,224,71,0.2) 50%, rgba(250,204,21,0) 100%)",
        }}
        transition={{ duration: 2 }}
      />

      {/* Efecto de resplandor central */}
      <motion.div
        className="absolute rounded-full z-10"
        style={{
          width: Number.parseInt(dimensions.mainObject.split("w-")[1]) * 2.5,
          height: Number.parseInt(dimensions.mainObject.split("h-")[1]) * 2.5,
        }}
        animate={{
          boxShadow: isDarkMode ? "0 0 60px 20px rgba(79, 70, 229, 0.3)" : "0 0 60px 30px rgba(250, 204, 21, 0.4)",
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      />

      {/* Nubes para el modo claro */}
      <AnimatePresence>
        {!isDarkMode &&
          clouds.map((cloud) => (
            <motion.div
              key={`cloud-${cloud.id}`}
              className="absolute bg-white rounded-full opacity-80 z-20"
              initial={{
                x: cloud.direction > 0 ? -80 : 80,
                y: cloud.y,
                width: cloud.width,
                height: cloud.height,
                opacity: 0.7,
              }}
              animate={{
                x: cloud.direction > 0 ? 80 : -80,
                y: cloud.y,
                opacity: [0.7, 0.9, 0.7],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: cloud.duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: cloud.delay,
                repeatType: "loop",
              }}
            />
          ))}
      </AnimatePresence>

      {/* Estrellas para el modo oscuro */}
      <AnimatePresence>
        {isDarkMode &&
          stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              className="absolute bg-white rounded-full z-20"
              initial={{
                x: star.x,
                y: star.y,
                width: 0,
                height: 0,
                opacity: 0,
              }}
              animate={{
                width: star.size,
                height: star.size,
                opacity: [0, 1, 0.5, 1],
                scale: [1, 1.5, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
      </AnimatePresence>

      {/* Estrellas fugaces en modo oscuro */}
      <AnimatePresence>
        {isDarkMode && (
          <>
            <motion.div
              className="absolute h-0.5 bg-white rounded-full z-20"
              style={{ width: Number.parseInt(dimensions.mainObject.split("w-")[1]) * 0.3 }}
              initial={{
                x: -50,
                y: -40,
                opacity: 0,
                rotate: 45,
                scale: 0,
              }}
              animate={{
                x: 50,
                y: 40,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 45,
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 7,
              }}
            />
            <motion.div
              className="absolute h-0.5 bg-white rounded-full z-20"
              style={{ width: Number.parseInt(dimensions.mainObject.split("w-")[1]) * 0.2 }}
              initial={{
                x: 40,
                y: -50,
                opacity: 0,
                rotate: 135,
                scale: 0,
              }}
              animate={{
                x: -30,
                y: 40,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 135,
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 9,
                delay: 3,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Sol */}
      <AnimatePresence>
        {!isDarkMode && (
          <motion.div
            className="relative z-30"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: isHovered ? -3 : 0,
            }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          >
            {/* Círculo central del sol */}
            <motion.div
              className={`${dimensions.mainObject} rounded-full bg-gradient-to-br from-yellow-300 to-amber-500`}
              animate={{
                boxShadow: isHovered ? "0 0 30px 5px rgba(250, 204, 21, 0.7)" : "0 0 20px 2px rgba(250, 204, 21, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Cara del sol */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                initial={false}
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Ojos */}
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-700"
                  style={{ top: "35%", left: "30%" }}
                  animate={isHovered ? { scaleY: 0.3, y: 1 } : { scaleY: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-700"
                  style={{ top: "35%", right: "30%" }}
                  animate={isHovered ? { scaleY: 0.3, y: 1 } : { scaleY: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Boca */}
                <motion.div
                  className="absolute w-4 h-2 rounded-full overflow-hidden"
                  style={{ bottom: "30%" }}
                  initial={false}
                  animate={isHovered ? { width: 6, height: 4 } : { width: 4, height: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="absolute bottom-0 w-full bg-amber-700 rounded-t-full"
                    style={{ height: "50%" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Rayos del sol */}
            {sunParticles.map((particle) => (
              <motion.div
                key={`ray-${particle.id}`}
                className="absolute bg-gradient-to-t from-amber-400 to-yellow-300 rounded-full origin-bottom"
                style={{
                  width: Number.parseInt(dimensions.mainObject.split("w-")[1]) * 0.15,
                  height: Number.parseInt(dimensions.mainObject.split("h-")[1]) * 0.5,
                  left: "50%",
                  top: "50%",
                  marginLeft: -Number.parseInt(dimensions.mainObject.split("w-")[1]) * 0.075,
                  marginTop: -Number.parseInt(dimensions.mainObject.split("h-")[1]) * 0.75,
                  transformOrigin: `50% ${Number.parseInt(dimensions.mainObject.split("h-")[1]) * 1.5}px`,
                }}
                initial={{ rotate: particle.angle * (180 / Math.PI), scaleY: 0.7 }}
                animate={{
                  rotate: particle.angle * (180 / Math.PI),
                  scaleY: [0.7, 1.2, 0.7],
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: (particle.id * 0.1) % 1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luna */}
      <AnimatePresence>
        {isDarkMode && (
          <motion.div
            className="relative z-30"
            initial={{ scale: 0, rotate: 180 }}
            animate={{
              scale: 1,
              rotate: 0,
              y: isHovered ? -3 : 0,
            }}
            exit={{ scale: 0, rotate: -180 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          >
            {/* Luna principal */}
            <motion.div className={`relative ${dimensions.mainObject} rounded-full overflow-hidden`}>
              {/* Fondo de la luna */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-100"
                animate={{
                  boxShadow: isHovered
                    ? "0 0 30px 5px rgba(226, 232, 240, 0.5)"
                    : "0 0 20px 2px rgba(226, 232, 240, 0.3)",
                }}
              />

              {/* Sombra de la luna */}
              <motion.div
                className="absolute rounded-full bg-indigo-900/10"
                style={{
                  width: Number.parseInt(dimensions.mainObject.split("w-")[1]) * 0.8,
                  height: Number.parseInt(dimensions.mainObject.split("h-")[1]) * 0.8,
                  right: -Number.parseInt(dimensions.mainObject.split("w-")[1]) * 0.3,
                  top: -Number.parseInt(dimensions.mainObject.split("h-")[1]) * 0.3,
                }}
                animate={{
                  opacity: isHovered ? 0.15 : 0.1,
                }}
              />

              {/* Cráteres de la luna */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-slate-300/70"
                style={{ top: "20%", left: "25%" }}
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-slate-300/70"
                style={{ top: "50%", right: "20%" }}
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full bg-slate-300/70"
                style={{ bottom: "25%", left: "40%" }}
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />

              {/* Cara de la luna */}
              {isHovered && (
                <motion.div className="absolute inset-0">
                  {/* Ojos cerrados */}
                  <motion.div
                    className="absolute w-2 h-0.5 bg-slate-500/80 rounded-full"
                    style={{ top: "40%", left: "30%" }}
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="absolute w-2 h-0.5 bg-slate-500/80 rounded-full"
                    style={{ top: "40%", right: "30%" }}
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  />

                  {/* Boca ZZZ */}
                  <motion.div
                    className="absolute text-slate-500/80 text-xs font-bold"
                    style={{ bottom: "30%", left: "50%", transform: "translateX(-50%)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    z
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partículas flotantes al interactuar */}
      <AnimatePresence>
        {isHovered && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute rounded-full z-40 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-indigo-300 to-blue-200"
                    : "bg-gradient-to-br from-amber-300 to-yellow-200"
                }`}
                style={{
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 80,
                  y: (Math.random() - 0.5) * 80,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1 + Math.random(),
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Efecto de presión */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 z-50 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.2,
              background: isDarkMode
                ? "radial-gradient(circle, rgba(79,70,229,0.5) 0%, rgba(49,46,129,0) 70%)"
                : "radial-gradient(circle, rgba(250,204,21,0.5) 0%, rgba(253,224,71,0) 70%)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

