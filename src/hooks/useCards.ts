import { useCallback, useContext, useEffect, useState } from 'react'
import { SportsContext } from '@/context/SportsContext'
import { addRecords } from '@/firebase/firestore/records'
import { TType } from '@/types/sports'

const DECISION_THRESHOLD = 75

export const useCards = (userId: string) => {
  const [isFirstCard, setIsFirstCard] = useState<string>('')
  const useSports = useContext(SportsContext)

  const handleSelectFirstCard = useCallback(
    (lastCard: Element, isLikeCard: boolean) => {
      if (lastCard) {
        sendDataToRecord(lastCard.id, isLikeCard, userId)
        const lessNumber = parseInt(lastCard.id) - 1
        setIsFirstCard(lessNumber.toString())
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId],
  )

  const startDrag = useCallback(
    (event: MouseEvent | TouchEvent) => {
      let isAnimating = false
      let pullDeltaX = 0

      if (isAnimating) return

      const actualCard = (event.target as HTMLElement).closest('article')

      if (!actualCard) return

      const startX =
        'pageX' in event
          ? (event as MouseEvent).pageX
          : (event as TouchEvent).touches[0].pageX

      const onMove = (event: MouseEvent | TouchEvent) => {
        const currentX =
          'pageX' in event
            ? (event as MouseEvent).pageX
            : (event as TouchEvent).touches[0].pageX

        pullDeltaX = currentX - startX

        if (pullDeltaX === 0) return

        isAnimating = true

        const deg = pullDeltaX / 14

        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
        actualCard.style.cursor = 'grabbing'

        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0

        const choiceEl = isRight
          ? actualCard.querySelector('.choice.like')
          : actualCard.querySelector('.choice.nope')

        if (choiceEl) {
          ;(choiceEl as HTMLElement).style.opacity = String(opacity)
        }
      }

      const onEnd = () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)

        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)

        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        if (decisionMade) {
          const goRight = pullDeltaX >= 0

          actualCard.classList.add(goRight ? 'go-right' : 'go-left')

          const handleTransitionEnd = () => {
            if (actualCard && actualCard.parentElement) {
              actualCard.removeEventListener(
                'transitionend',
                handleTransitionEnd,
              )
              actualCard.classList.add('reset')

              handleSelectFirstCard(actualCard, !!goRight)
            }
          }

          actualCard.addEventListener('transitionend', handleTransitionEnd)
        } else {
          actualCard.classList.add('reset')
          actualCard.classList.remove('go-right', 'go-left')

          const choiceEls = actualCard.querySelectorAll('.choice')
          choiceEls.forEach((choice) => {
            ;(choice as HTMLElement).style.opacity = '0'
          })
        }

        const handleTransitionEnd = () => {
          if (actualCard && actualCard.parentElement) {
            actualCard.removeEventListener('transitionend', handleTransitionEnd)

            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')

            pullDeltaX = 0
            isAnimating = false
            const choiceEls = actualCard.querySelectorAll('.choice')
            choiceEls.forEach((choice) => {
              ;(choice as HTMLElement).style.opacity = '0'
            })
          }
        }

        actualCard.addEventListener('transitionend', handleTransitionEnd)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onEnd)

      document.addEventListener('touchmove', onMove, { passive: true })
      document.addEventListener('touchend', onEnd, { passive: true })
    },
    [handleSelectFirstCard],
  )

  const rejectDragAut = (actualCard: HTMLElement) => {
    actualCard.style.transform = `translateX(-550px) rotate(-20deg)`
    actualCard.classList.add('go-left')
    const reject = actualCard.querySelector('.choice.nope')
    if (reject) {
      ;(reject as HTMLElement).style.opacity = String(Math.abs(-550) / 100)
    }
    handleSaveDecision('reject', actualCard.id)
  }

  const favDragAut = (actualCard: HTMLElement) => {
    actualCard.style.transform = `translateX(550px) rotate(20deg)`
    actualCard.classList.add('go-right')
    const like = actualCard.querySelector('.choice.like')
    if (like) {
      ;(like as HTMLElement).style.opacity = String(Math.abs(550) / 100)
    }
    handleSaveDecision('accept', actualCard.id)
  }

  const handleSaveDecision = (type: TType, id: string) => {
    if (!type || !id) {
      return
    }

    const firstCard = document.getElementById(isFirstCard)

    if (firstCard) sendDataToRecord(firstCard.id, type === 'accept', userId)
  }

  useEffect(() => {
    if (useSports?.sports && useSports.sports?.length > 0) {
      setIsFirstCard(
        useSports?.sports?.[useSports?.sports?.length - 1 || 0].idSport || '',
      )
    }
  }, [useSports?.sports])

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      document.addEventListener('mousedown', (e) => startDrag(e))

      document.addEventListener('touchstart', (e) => startDrag(e), {
        passive: true,
      })
    }

    return () => {
      document.removeEventListener('mousedown', (e) => startDrag(e))
      document.removeEventListener('touchstart', (e) => startDrag(e))
      isMounted = false
    }
  }, [startDrag])

  const moveCard = (type: TType) => {
    const firstCard = document.getElementById(isFirstCard)

    if (firstCard) {
      type === 'reject' ? rejectDragAut(firstCard) : favDragAut(firstCard)

      if (firstCard.id && !!useSports?.sports) {
        let lessNumber: string | undefined

        sendDataToRecord(firstCard.id, type === 'accept', userId)

        const index = useSports?.sports.findIndex(
          (item) => item.idSport === firstCard.id,
        )

        if (index && index !== -1) {
          const aux = useSports?.sports[index - 1]
          if (aux) {
            lessNumber = aux.idSport
          }
        }

        setIsFirstCard((lessNumber || 0).toString())
      }
    }
  }

  const sendDataToRecord = (
    lastCardId: string,
    isLikeCard: boolean,
    userId: string,
  ) => {
    const dataToSend = {
      userId,
      sportId: lastCardId,
      like: isLikeCard,
    }

    addRecords(dataToSend, useSports?.handleChangeSports)
  }

  return { moveCard }
}
