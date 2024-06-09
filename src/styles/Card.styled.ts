import styled from 'styled-components'
import { lightTheme } from './theme.styled'

export const CardContainer = styled.div<{
  $currentTheme?: string
  $height: number
}>`
  .shadow {
    display: flex;
    justify-content: center;

    @media (max-width: 600px) {
      height: 88vh;
    }
  }

  .sub-container {
    width: ${(props) => `${props.$height - props.$height / 2}px`};
    height: ${(props) => `${props.$height ? props.$height - 80 : 400}px`};
    display: flex;
    position: relative;
    justify-content: center;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
    border-radius: 32px;
    gap: 24px;
    flex-direction: column;
    overflow: hidden;
    padding: 16px 6px;
    overflow: hidden;
    user-select: none;

    @media (max-width: 600px) {
      width: 100%;
      height: 500px;
      padding: 0;
      border-radius: 0;
    }
  }

  footer {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }

  .heart {
    border-radius: 50px;
    background: linear-gradient(125.02deg, #236bfe -17.11%, #063ba8 98.58%);
    box-shadow: 0px 10px 25px 0px #236bfe33;
    width: 70px;
    height: 70px;
    align-content: center;
    text-align: center;
    cursor: pointer;

    &:hover {
      .icon-heart {
        width: 40px;
      }
    }

    .icon-heart {
      color: #fff;
      width: 36px;
      height: 75px;
      transition: all 0.2s ease;
    }

    @media (max-width: 600px) {
      width: 60px;
      height: 60px;

      .icon-heart {
        width: 33px;
        height: 64px;
      }
    }
  }

  .ex {
    border-radius: 50px;
    width: 50px;
    height: 50px;
    background: ${({ theme }) => theme.colors.bar};
    align-content: center;
    text-align: center;
    cursor: pointer;

    &:hover {
      .icon-close {
        width: 34px;
      }
    }

    .icon-close {
      color: ${(props) =>
        props.$currentTheme === lightTheme.namespace ? '#D36060' : '#FFF'};
      width: 28px;
      height: 48px;
      transition: all 0.2s ease;
    }

    @media (max-width: 600px) {
      width: 40px;
      height: 40px;

      .icon-close {
        width: 28px;
        height: 41px;
      }
    }
  }
  .cards {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    & > span {
      display: grid;
      place-content: center;
      color: #777;
      font-size: 14px;
      text-align: center;
      height: 100%;
      z-index: -1;
    }
  }
`

export const Article = styled.article`
  border-radius: 8px;
  cursor: grab;
  overflow: hidden;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  transition:
    transform 0.5s ease,
    rotate 0.5s ease;

  @media (max-width: 600px) {
    border-radius: 0px 0px 32px 32px;
  }

  &.go-left {
    transform: translateX(-150%) rotate(-30deg) !important;
  }

  &.go-right {
    transform: translateX(150%) rotate(30deg) !important;
  }

  &.go-left,
  &.go-right {
    transition:
      transform 0.5s ease,
      rotate 0.5s ease;
  }

  &.reset {
    transition: transform 0.3s ease;
    transform: translateX(0) !important;
  }

  & .choice {
    border-radius: 8px;
    color: black;
    border: 4px solid;
    z-index: 5;
    position: absolute;
    top: 32px;
    right: 16px;
    opacity: 0;
    padding: 4px 8px;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: fit-content;

    &.nope {
      border-color: #ff6e63;
      color: #ff6e63;
      transform: rotate(30deg);
    }

    &.like {
      border-color: #63ff68;
      color: #63ff68;
      left: 16px;
      transform: rotate(-30deg);
    }
  }

  & .big-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & h2 {
    color: white;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    padding: 16px;
    z-index: 3;
    background: linear-gradient(to top, #00000088 20%, transparent 40%);
    box-sizing: border-box;
    margin: 0;
  }

  & span {
    margin-left: 6px;
    font-size: 18px;
    line-height: 1.4;
    font-weight: 400;
  }
`
