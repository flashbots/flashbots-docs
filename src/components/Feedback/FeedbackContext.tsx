import React, { ReactNode, useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useLocalStorage } from "@chainsafe/browser-storage-hooks"
import { ClientJS } from 'clientjs';

type FeedbackContextProps = {
  children: ReactNode | ReactNode[]
}

type FeedbackContextType = {
  currentUserId: string | undefined
}

const userIdKey = "FBD.userId"
const feedbackKey = (userId: string) => `FBD.feedback.${userId}`

interface IFeedbackItem {
  article: string
  rating: 1 | 2 | 3
}

const FeedbackContext = React.createContext<FeedbackContextType | undefined>(undefined)

const FeedbackProvider = ({ children }: FeedbackContextProps) => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>()
  const [feedback, setFeedback] = useState<IFeedbackItem[] | undefined>()
  const { canUseLocalStorage } = useLocalStorage()
  const client = new ClientJS();

  useEffect(() => {
    if (canUseLocalStorage && !currentUserId) {
      const userId = localStorage.getItem(userIdKey)
      if (!userId) {
        const newId = client.getFingerprint()
        localStorage.setItem(userIdKey, `${newId}`)
        setCurrentUserId(`${newId}`)
      } else {
        setCurrentUserId(userId)
      }
    }
  }, [canUseLocalStorage, currentUserId])


  useEffect(() => {
    if (canUseLocalStorage && currentUserId && !feedback) {
      const feedback = localStorage.getItem(feedbackKey(currentUserId))
      if (!feedback) {
        localStorage.setItem(feedbackKey(currentUserId), JSON.stringify([]))
        setFeedback([])
      } else {
        setFeedback(JSON.parse(feedback))
      }
    } else if (canUseLocalStorage && currentUserId && feedback) {
      localStorage.setItem(feedbackKey(currentUserId), JSON.stringify(feedback))
    }
  }, [canUseLocalStorage, currentUserId, feedback])

  const provideFeedback = useCallback(async (article: string, rating: number) => {

  }, [])

  return <FeedbackContext.Provider
    value={{
      currentUserId
    }}>
    {children}
  </FeedbackContext.Provider>
}

const useFeedback = () => {
  const context = React.useContext(FeedbackContext)
  if (context === undefined) {
    throw new Error("useFeedback must be used within a FeedbackContext")
  }
  return context
}

export { FeedbackProvider, useFeedback }