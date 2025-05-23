import { useEffect } from "react";
import audioEngine from "../../lib/AudioEngine";
import keyboardService from "../../lib/KeyboardService";
import DrumPadButton from "../DrumPadButton/DrumPadButton";
import "./DrumPad.css";

const DrumPad = ({ setCurrentSample, kit, allRefs, keystrokes }) => {
  useEffect(() => {
    // Set up keyboard callbacks
    const handleKeyDown = (event) => {
      keyboardService.handleKeyDown(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handlePadClick = (note, sample) => {
    audioEngine.playNote(note);
    setCurrentSample(sample);
  };

  return (
    <>
      {kit && (
        <div className="pad-container fade-in">
          <DrumPadButton
            ref={allRefs[4]}
            note={"E3"}
            id={"melody"}
            imgSrc={kit.elements.melody.thumbnail_url}
            keystroke={keystrokes[0]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("E3", kit.elements.melody)}
          />
          <DrumPadButton
            ref={allRefs[5]}
            note={"F3"}
            id={"texture"}
            imgSrc={kit.elements.texture.thumbnail_url}
            keystroke={keystrokes[1]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("F3", kit.elements.texture)}
          />
          <DrumPadButton
            ref={allRefs[6]}
            note={"F#3"}
            id={"one_shot_1"}
            imgSrc={kit.elements.one_shot_1.thumbnail_url}
            keystroke={keystrokes[2]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("F#3", kit.elements.one_shot_1)}
          />
          <DrumPadButton
            ref={allRefs[7]}
            note={"G3"}
            id={"one_shot_2"}
            imgSrc={kit.elements.one_shot_2.thumbnail_url}
            keystroke={keystrokes[3]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("G3", kit.elements.one_shot_2)}
          />
          <DrumPadButton
            ref={allRefs[0]}
            note={"C3"}
            id={"kick"}
            imgSrc={kit.elements.kick.thumbnail_url}
            keystroke={keystrokes[4]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("C3", kit.elements.kick)}
          />
          <DrumPadButton
            ref={allRefs[1]}
            note={"C#3"}
            id={"snare"}
            imgSrc={kit.elements.snare.thumbnail_url}
            keystroke={keystrokes[5]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("C#3", kit.elements.snare)}
          />
          <DrumPadButton
            ref={allRefs[2]}
            note={"D3"}
            id={"hh_closed"}
            imgSrc={kit.elements.hh_closed.thumbnail_url}
            keystroke={keystrokes[6]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("D3", kit.elements.hh_closed)}
          />
          <DrumPadButton
            ref={allRefs[3]}
            note={"D#3"}
            id={"hh_open"}
            imgSrc={kit.elements.hh_open.thumbnail_url}
            keystroke={keystrokes[7]}
            setCurrentSample={setCurrentSample}
            kit={kit}
            onClick={() => handlePadClick("D#3", kit.elements.hh_open)}
          />
        </div>
      )}
    </>
  );
};

export default DrumPad;
