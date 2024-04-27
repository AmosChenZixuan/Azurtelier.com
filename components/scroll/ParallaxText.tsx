//https://www.framer.com/motion/scroll-animations/
'use client'
import 'css/parallaxText.css'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion'
import { wrap } from '@motionone/utils'

interface ParallaxProps {
  children: string
  baseVelocity: number
  className?: string
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 50], {
    clamp: false,
  })

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const d = useTransform(base, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    base.set(base.get() + moveBy)
  })

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className={`parallax ${className ? className : ''}`}>
      <motion.div
        className="scroller"
        style={{ x: d, rotate: 0 }}
        transformTemplate={({ x, rotate }) => `rotate(${rotate})  translateX(${x})`}
      >
        <span> {children} </span>
        <span> {children} </span>
        <span> {children} </span>
        <span> {children} </span>
      </motion.div>
    </div>
  )
}

const ScrollingBanner = () => (
  <section className="text-primary-300">
    <ParallaxText baseVelocity={-2} className="fixed bottom-0 max-w-5xl font-zzz">
      Framer MotionFramer
    </ParallaxText>
    <ParallaxText baseVelocity={2} className="fixed bottom-12 max-w-5xl font-zzz">
      Scroll velocity
    </ParallaxText>
  </section>
)
export default ScrollingBanner
