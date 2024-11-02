import { style } from '@vanilla-extract/css'

import * as layers from './styles/layers.css'
import './styles/reset.css'

export const myStyle = style({
  '@layer': {
    [layers.components]: {
      width: '100vw',
      height: '100vh',
      backgroundColor: 'whitesmoke'
    }
  }
})
