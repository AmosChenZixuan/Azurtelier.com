//https://www.framer.com/motion/scroll-animations/
'use client'
import 'css/parallaxText.css'
import { MutableRefObject, useEffect, useRef } from 'react'
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
  children: React.ReactNode
  baseVelocity: number
  className?: string
}

const onHover = (
  scrollerRef: MutableRefObject<HTMLDivElement | null>,
  prevVelocity: MutableRefObject<number>,
  currVelocity: MutableRefObject<number>
) => {
  const scroller = scrollerRef.current

  const handleMouseEnter = () => {
    prevVelocity.current = currVelocity.current
    currVelocity.current = 0
  }

  const handleMouseLeave = () => {
    currVelocity.current = prevVelocity.current
  }

  if (scroller) {
    scroller.addEventListener('mouseenter', handleMouseEnter)
    scroller.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      scroller.removeEventListener('mouseenter', handleMouseEnter)
      scroller.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
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

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const currVelocity = useRef(baseVelocity)
  const prevVelocity = useRef(baseVelocity)
  // stop scrolling when mouse is hovering
  useEffect(() => {
    const cleanup = onHover(scrollerRef, prevVelocity, currVelocity)
    return cleanup
  }, [])

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const d = useTransform(base, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * currVelocity.current * (delta / 1000)

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
    <div ref={scrollerRef} className={`parallax ${className ? className : ''}`}>
      <motion.div
        className="scroller"
        style={{ x: d, rotate: 0 }}
        transformTemplate={({ x, rotate }) => `rotate(${rotate})  translateX(${x})`}
      >
        {children} {children} {children} {children}
      </motion.div>
    </div>
  )
}

export default ParallaxText
