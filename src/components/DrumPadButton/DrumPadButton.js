import { forwardRef } from 'react'
import "../DrumPad/DrumPad.css"

const DrumPadButton = forwardRef(
  ({ note, id, imgSrc, keystroke, setCurrentSample, kit, onClick }, ref) => {
    const handleClick = () => {
      onClick()
    }

    return (
      <button
        ref={ref}
        className='drum-pad'
        onClick={handleClick}
        data-note={note}
        data-id={id}>
        <img src={imgSrc} alt={id} className='pad-image' />
        <span className='keystroke'>{keystroke}</span>
      </button>
    )
  }
)

export default DrumPadButton
