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

      .MuiTouchRipple-root {
        display: none;
      }
      .MuiButtonBase-root:hover,
      .MuiButtonBase-root.Mui-focusVisible {
        background-color: transparent !important;
        box-shadow: none;
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
