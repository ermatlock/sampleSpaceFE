import { useEffect, useState } from "react";
import audioEngine from "../../lib/AudioEngine";
import PianoRollDisplay from "../PianoRollDisplay/PianoRollDisplay.js";
import "./PianoRoll.css";

const PianoRoll = ({ kit, bpm }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [steps, setSteps] = useState(kit.sequence);

	useEffect(() => {
		// Update steps when kit changes
		setSteps(kit.sequence);
	}, [kit]);

	useEffect(() => {
		// Load kit into audio engine
		audioEngine.loadKit(kit);
	}, [kit]);

	useEffect(() => {
		// Update BPM in audio engine
		audioEngine.updateBpm(bpm);
	}, [bpm]);

	useEffect(() => {
		// Update steps in audio engine
		audioEngine.updateSteps(steps);
	}, [steps]);

	useEffect(() => {
		// Subscribe to current step index changes
		const interval = setInterval(() => {
			if (isPlaying) {
				setCurrentStepIndex(audioEngine.getCurrentStepIndex());
			}
		}, 50);

		return () => clearInterval(interval);
	}, [isPlaying]);

	const handlePlayToggle = () => {
		const newIsPlaying = audioEngine.togglePlay();
		setIsPlaying(newIsPlaying);
	};

	return (
		<>
			{kit && (
				<section className="piano-roll fade-in">
					<button
						className="play-button"
						onClick={handlePlayToggle}>
						{isPlaying ? " STOP " : " PLAY "}
					</button>

					<PianoRollDisplay
						currentStepIndex={currentStepIndex}
						steps={steps}
						setSteps={setSteps}
						isPlaying={isPlaying}
					/>
				</section>
			)}
		</>
	);
};

export default PianoRoll;
