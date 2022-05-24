import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import './PianoRow.css'

const PianoRow = ({ name, note, steps, currentStepIndex, setSteps }) => {

  const toggleNote = (note, i) => {
    let newSteps = [...steps];

    if( !steps[i] ) {
      newSteps[i] = [note]
      setSteps(newSteps);
      return
    } else if(steps[i].includes(note)) {
      newSteps[i] = newSteps[i].filter((nt) => nt !== note);
      if(newSteps[i].length === 0) newSteps[i] = null;
      setSteps(newSteps);
      return
    } else {
      newSteps[i].push(note);
      setSteps(newSteps);
      return
    }
  }

  let row = (
    <div className='row'>
    {name ? <p>{name}</p> : <p> </p>}
    {name ? steps.map((step, index) => steps[index] && steps[index].includes(note) ? <button onClick={() => toggleNote(note, index)} key={index} className='active piano-button'></button> : <button onClick={() => toggleNote(note, index)} key={index} className='piano-button'></button>) : steps.map((step, index) =><p key={index}>{index + 1}</p>)}
    </div>
  )


    return (
      <>
      {row}
      </>
=======
=======
import './PianoRow.css'

const PianoRow = ({ name, note, steps, currentStepIndex, setSteps }) => {
  
  let row = (
    <div className='row'>
    {name ? <p>{name}</p> : <p> </p>}
    {name ? steps.map((step, index) => steps[index] && steps[index].includes(note) ? <button onClick={() => toggleNote(note, index)} key={index}>{index}</button> : <button onClick={} >Pog</button>) : steps.map((step, index) => <p key={index}>{index + 1}</p>)}
    </div>
  )

>>>>>>> 99266b1 (Create row with buttons)

    return (
<<<<<<< HEAD
        <div>
        </div>
>>>>>>> e704ce2 (Create PianoRow component)
=======
      <>
      {row}
      </>
>>>>>>> 99266b1 (Create row with buttons)
    )
}

export default PianoRow;
