import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

interface ToastProps {
  type?: 'success' | 'error' | 'info'
  hasDescription: boolean
}

const ContainerVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #9dde9f;
    color: #256020;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
}

export const Container = styled(animated.div) <ToastProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${(props) => ContainerVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0px 0px;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 9px;
    top: 16px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`
