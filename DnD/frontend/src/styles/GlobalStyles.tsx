import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      html,
      body,
      #root {
        margin: 0;
        padding: 0;
      }

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #474740;
        border-radius: 8px;
        border: 1px solid #474740;
      }
      &::-webkit-scrollbar-track {
        border-left: 1px solid #151312;
        background-color: #2c2928;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }

      .MuiTouchRipple-root {
        display: none;
      }
      .MuiButtonBase-root:hover,
      .MuiButtonBase-root.Mui-focusVisible {
        background-color: transparent !important;
        box-shadow: none;
      }

      .MuiMenu-list {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }

      .disabled {
        cursor: default !important;
        filter: brightness(0.5) !important;
        text-shadow: none !important;
      }

      @keyframes metal-animation-back {
        0% {
          background-size: 100%;
        }
        40% {
          background-size: 300%;
        }
        100% {
          background-size: 190%;
        }
      }

      @keyframes metal-animation {
        0% {
          background-size: 190%;
        }
        40% {
          background-size: 300%;
        }
        100% {
          background-size: 100%;
        }
      }

      @keyframes shine {
        0% {
          background-size: 100%;
        }
        40% {
          background-size: 500%;
        }
        100% {
          background-size: 200%;
        }
      }
      @keyframes shine-back {
        0% {
          background-size: 200%;
        }
        40% {
          background-size: 500%;
        }
        100% {
          background-size: 100%;
        }
      }
    `}
  />
)
