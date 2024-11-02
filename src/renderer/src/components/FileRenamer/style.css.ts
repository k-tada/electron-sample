import { style } from '@vanilla-extract/css'
import * as layers from '../../styles/layers.css'

export const container = style({
  '@layer': {
    [layers.components]: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }
  }
})

export const dndArea = style([
  container,
  {
    width: '160px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid lightgray'
  }
])

export const filesArea = style([
  container,
  {
    width: '100%',
    minHeight: '80px',
    flex: 1,
    border: '1px solid lightgray'
  }
])
