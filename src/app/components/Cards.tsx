'use client'

import { SportsContext } from '@/context/SportsContext'
import { ThemeContext } from '@/context/ThemeContext'
import { UserContext } from '@/context/UserContext'
import { useCards } from '@/hooks/useCards'
import { Article, CardContainer } from '@/styles/Card.styled'
import { SwitchTheme } from '@/styles/SwitchTheme.styled'
import { lightTheme } from '@/styles/theme.styled'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { VscHeartFilled } from 'react-icons/vsc'
import { useMedia, useWindowSize } from 'react-use'
import 'swiper/swiper-bundle.css'

export const Cards = () => {
  const [userState] = useContext<any>(UserContext)
  const useTheme = useContext(ThemeContext)
  const useSports = useContext(SportsContext)

  const [sizeTrue, setSizeTrue] = useState<number>(420)

  const { moveCard } = useCards(userState.uid)

  const size = useWindowSize()
  const isMobile = useMedia('(max-width: 600px)')

  useEffect(() => {
    setSizeTrue(size.height)
  }, [size])

  return (
    <CardContainer $currentTheme={useTheme?.theme.namespace} $height={sizeTrue}>
      <div className="shadow">
        <div className="sub-container">
          <div className="cards">
            {!!useSports?.sports &&
              useSports.sports.map((sport) => (
                <Article id={sport.idSport} key={sport.idSport}>
                  {isMobile && (
                    <SwitchTheme
                      $currentTheme={useTheme?.theme.namespace}
                      onClick={useTheme?.toggleTheme}
                    >
                      <Image
                        src={
                          useTheme?.theme.namespace === lightTheme.namespace
                            ? '/moon.svg'
                            : '/sun.svg'
                        }
                        alt="Toggle theme"
                        width={30}
                        height={30}
                      />
                    </SwitchTheme>
                  )}

                  <Image
                    className="big-image"
                    src={sport.strSportThumb || '/default_sport.jpeg'}
                    fill
                    alt="Image card"
                  />

                  <h2>{sport.strSport}</h2>

                  <div className="choice nope">NOPE</div>
                  <div className="choice like">LIKE</div>
                </Article>
              ))}

            <span>
              No more sports...
              <br />
              Try again later
            </span>
          </div>

          <footer>
            <div className="ex" onClick={() => moveCard('reject')}>
              <IoIosClose className="icon-close" />
            </div>

            <div className="heart" onClick={() => moveCard('accept')}>
              <VscHeartFilled className="icon-heart" />
            </div>
          </footer>
        </div>
      </div>
    </CardContainer>
  )
}
