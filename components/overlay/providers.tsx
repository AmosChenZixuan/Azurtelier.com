'use client'
import React, { createContext, useState, useContext } from 'react'

interface ImageOverlayContextProps {
  overlayImage: string | null
  setOverlayImage: React.Dispatch<React.SetStateAction<string | null>>
  isOverlayVisible: boolean
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImageOverlayContext = createContext<ImageOverlayContextProps | undefined>(undefined)

export const ImageOverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overlayImage, setOverlayImage] = useState<string | null>(null)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  return (
    <ImageOverlayContext.Provider
      value={{ overlayImage, setOverlayImage, isOverlayVisible, setIsOverlayVisible }}
    >
      {children}
    </ImageOverlayContext.Provider>
  )
}

export const useImageOverlay = () => {
  const context = useContext(ImageOverlayContext)
  if (context === undefined) {
    throw new Error('useOverlay must be used within a OverlayProvider')
  }
  return context
}
