import { useState } from 'react';
import { Song, Track, Instrument } from 'reactronica';
<<<<<<< HEAD
<<<<<<< HEAD
import PianoRollDisplay from '../PianoRollDisplay/PianoRollDisplay.js';
import './PianoRoll.css'
import { sampleKit } from '../../sampleKit.js'
=======
import PianoRollDisplay from '../PianoRollDisplay/PianoRollDisplay.js';
>>>>>>> 021424f (Import PianoRollDisplay and pass steps props)

const PianoRoll = ({ kit }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState([
    ['C3'],
    null,
    null,
    null,
    ['C#3'],
    null,
    null,
    null,
    ['C3'],
    null,
    null,
    null,
    ['C#3'],
    null,
    null,
    null
  ])
=======

<<<<<<< HEAD

const PianoRoll = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  
>>>>>>> c9da7bb (Import reactronica and React)
=======
  const [isPlaying, setIsPlaying] - useState(false);
=======
=======
const PianoRoll = ({ kit }) => {
>>>>>>> 15e34c2 (Pass kit down as props)
  const [isPlaying, setIsPlaying] = useState(false);
>>>>>>> 471cda8 (Create button to control PianoRoll is playing or not)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState([
    ['C3', 'C#3'],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ])
>>>>>>> 37c86b6 (Initialize react hooks)
    return (
      <>
<<<<<<< HEAD
<<<<<<< HEAD
      {kit && (
        <section className="piano-roll">
        <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? ' || ' : ' |> '}
        </button>

        <PianoRollDisplay
        currentStepIndex={currentStepIndex}
        steps={steps}
        setSteps={setSteps}
        />


        <Song isPlaying={isPlaying}
          bpm={180}>
          <Track
            steps={steps}
            onStepPlay={(stepNotes, index) => {
              setCurrentStepIndex(index);
            }}
          >
            <Instrument
            type='sampler'
            samples={{
              // C3: kit.elements.kick.sound_url,
              // 'C#3': kit.elements.snare.sound_url,
              // D3: kit.elements.hh_closed.sound_url,
              // 'D#3': kit.elements.hh_open.sound_url,
              // E3: kit.elements.melody.sound_url,
              // F3: kit.elements.one_shot_1.sound_url,
              // 'F#3': kit.elements.one_shot_2.sound_url,
              // G3: kit.elements.texture.sound_url

               C3: sampleKit.kit1[0].sample,
              'C#3': sampleKit.kit1[1].sample,
              D3: sampleKit.kit1[2].sample,
              'D#3': sampleKit.kit1[3].sample,
              E3: sampleKit.kit1[4].sample,
              F3: sampleKit.kit1[5].sample,
              'F#3': sampleKit.kit1[6].sample,
              G3: sampleKit.kit1[7].sample
            }}
            />
          </Track>
        </Song>
      </section>
      )}
=======
=======
      {kit && (
        <>
>>>>>>> 021424f (Import PianoRollDisplay and pass steps props)
        <h1>PIANO ROLL</h1>
        <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? ' || ' : ' |> '}
        </button>
<<<<<<< HEAD
>>>>>>> 471cda8 (Create button to control PianoRoll is playing or not)
=======

        <PianoRollDisplay
        currentStepIndex={currentStepIndex}
        steps={steps}
        onclick={(steps) => setSteps(steps)}
        />


        <Song isPlaying={isPlaying}>
          <Track
            steps={steps}
            onStepPlay={(stepNotes, index) => {
              setCurrentStepIndex(index);
            }}
          >
            <Instrument
            type='sampler'
            samples={{
              C3: kit.elements.kick.sound_url,
              'C#3': kit.elements.snare.sound_url,
              D3: kit.elements.hh_closed.sound_url,
              'D#3': kit.elements.hh_open.sound_url,
              E3: kit.elements.melody.sound_url,
              F3: kit.elements.one_shot_1.sound_url,
              'F#3': kit.elements.one_shot_2.sound_url,
              G3: kit.elements.texture.sound_url
            }}
            />
          </Track>
        </Song>
<<<<<<< HEAD
>>>>>>> 15e34c2 (Pass kit down as props)
=======
        </>
      )}
>>>>>>> 021424f (Import PianoRollDisplay and pass steps props)
      </>
    )
}

export default PianoRoll
