'use client'
import React, { createContext, useState, useContext } from 'react'

interface ImageOverlayContextProps {
  isOverlayVisible: boolean
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>
  imageList: string[] | null
  setImageList: React.Dispatch<React.SetStateAction<string[] | null>>
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  callerId: string
  setCallerId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const ImageOverlayContext = createContext<ImageOverlayContextProps | undefined>(undefined)

export const ImageOverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [imageList, setImageList] = useState<string[] | null>(null)
  const [index, setIndex] = useState<number>(0)
  const [callerId, setCallerId] = useState<string>('')

  return (
    <ImageOverlayContext.Provider
      value={{
        isOverlayVisible,
        setIsOverlayVisible,
        imageList,
        setImageList,
        index,
        setIndex,
        callerId,
        setCallerId,
      }}
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
