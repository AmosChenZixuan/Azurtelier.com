'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollTextBox() {
  const { scrollY } = useScroll()
  console.log(scrollY.get())
  const viewPoints = [0, 250, 500, 750, 1000]
  const scale = useTransform(scrollY, viewPoints, [1, 1.5, 1.5, 1, 1])
  const rotate = useTransform(scrollY, viewPoints, [0, 0, 180, 180, 0])
  const borderRadius = useTransform(scrollY, viewPoints, ['0%', '0%', '50%', '50%', '0%'])

  return (
    <div
      className={`card bg-pink-blue-animated animation-delay-2 flex-center flex-grow flex-col space-y-5 overflow-hidden p-2`}
    >
      <h1 className="font-zzz2 text-white">Coming Soon</h1>
      <motion.div className="bg-gray-purple h-8 w-8" style={{ scale, rotate, borderRadius }} />
    </div>
  )
}