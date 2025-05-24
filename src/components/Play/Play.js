import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sample-space-logo.svg";
import audioEngine from "../../lib/AudioEngine";
import keyboardService from "../../lib/KeyboardService";
import { Kits } from "../../lib/KitData";
import DrumPad from "../DrumPad/DrumPad";
import { Error } from "../Error/Error";
import InfoBox from "../InfoBox/InfoBox";
import { Loader } from "../Loader/Loader";
import PianoRoll from "../PianoRoll/PianoRoll.js";
import "./Play.css";

const Play = () => {
	const [kit, setKit] = useState(null);
	const [currentSample, setCurrentSample] = useState(null);
	const [selectedKit, setSelectedKit] = useState("Magnetosphere");
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [bpm, setBpm] = useState(null);
	const [swing, setSwing] = useState(0);
	const [reverbWet, setReverbWet] = useState(0);
	const [delayWet, setDelayWet] = useState(0);
	const [filterFreq, setFilterFreq] = useState(1000);

	const kickRef = useRef(null);
	const snareRef = useRef(null);
	const hhClosedRef = useRef(null);
	const hhOpenRef = useRef(null);
	const oneShotOneRef = useRef(null);
	const oneShotTwoRef = useRef(null);
	const melodyRef = useRef(null);
	const grooveRef = useRef(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		// Set up keyboard callbacks for each pad
		keyboardService.addCallback("C3", () => kickRef.current?.click());
		keyboardService.addCallback("C#3", () => snareRef.current?.click());
		keyboardService.addCallback("D3", () => hhClosedRef.current?.click());
		keyboardService.addCallback("D#3", () => hhOpenRef.current?.click());
		keyboardService.addCallback("E3", () => melodyRef.current?.click());
		keyboardService.addCallback("F3", () => oneShotOneRef.current?.click());
		keyboardService.addCallback("F#3", () => oneShotTwoRef.current?.click());
		keyboardService.addCallback("G3", () => grooveRef.current?.click());

		return () => {
			// Clean up keyboard callbacks
			keyboardService.removeCallback("C3");
			keyboardService.removeCallback("C#3");
			keyboardService.removeCallback("D3");
			keyboardService.removeCallback("D#3");
			keyboardService.removeCallback("E3");
			keyboardService.removeCallback("F3");
			keyboardService.removeCallback("F#3");
			keyboardService.removeCallback("G3");
		};
	}, []);

	useEffect(() => {
		const loadKit = async () => {
			try {
				setLoading(true);
				const selectedKitData = Kits[selectedKit];
				if (selectedKitData) {
					setKit(selectedKitData);
					setBpm(selectedKitData.bpm);
					await audioEngine.loadKit(selectedKitData);
				} else {
					setErrorMessage("Kit not found");
				}
			} catch (error) {
				setErrorMessage("Error loading kit");
			} finally {
				setLoading(false);
			}
		};

		loadKit();
	}, [selectedKit]);

	const clearSamples = () => {
		setKit(null);
	};

	const handleContainerClick = async () => {
		await audioEngine.resumeAudioContext();
	};

	return (
		<div className="play-container" onClick={handleContainerClick}>
			<header className="play-header">
				<Link to="/" onClick={clearSamples}>
					<img src={logo} alt="Sample Space Logo" className="logo" />
				</Link>
				<select
					ref={dropdownRef}
					value={selectedKit}
					onChange={(e) => setSelectedKit(e.target.value)}
					className="kit-selector">
					<option value="Magnetosphere">Magnetosphere</option>
					<option value="Andromeda%20Strain">Andromeda Strain</option>
					<option value="Apollo%2011">Apollo 11</option>
				</select>
			</header>

			{loading && !errorMessage ? (
				<Loader />
			) : errorMessage ? (
				<Error error={errorMessage} noMatch={false} />
			) : (
				kit && (
					<main className="main-container">
						<div className="drum-infobox-container">
							<DrumPad
								kit={kit}
								setCurrentSample={setCurrentSample}
								allRefs={[
									kickRef,
									snareRef,
									hhClosedRef,
									hhOpenRef,
									melodyRef,
									oneShotOneRef,
									oneShotTwoRef,
									grooveRef,
								]}
								keystrokes={["Q", "W", "E", "R", "A", "S", "D", "F"]}
							/>
							<InfoBox currentSample={currentSample} tempo={kit.bpm} />
						</div>
						<div className="bpm-selector">
							<label htmlFor="bpm">Tempo: {bpm}</label>
							<input
								type="range"
								min="40"
								max="200"
								name="bpm"
								value={bpm}
								onChange={(e) => setBpm(e.target.value)}
								onDoubleClick={() => setBpm(kit.bpm)}
							/>
						</div>
						<div className="swing-selector">
							<label htmlFor="swing">Swing: {Math.round(swing * 100)}%</label>
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								name="swing"
								value={swing}
								onChange={(e) => {
									setSwing(parseFloat(e.target.value));
									audioEngine.updateSwing(parseFloat(e.target.value));
								}}
							/>
						</div>
						<div className="effects-container">
							<div className="effect-control">
								<label htmlFor="reverb">Reverb: {Math.round(reverbWet * 100)}%</label>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									name="reverb"
									value={reverbWet}
									onChange={(e) => {
										setReverbWet(parseFloat(e.target.value));
										audioEngine.updateReverbWet(parseFloat(e.target.value));
									}}
								/>
							</div>
							<div className="effect-control">
								<label htmlFor="delay">Delay: {Math.round(delayWet * 100)}%</label>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									name="delay"
									value={delayWet}
									onChange={(e) => {
										setDelayWet(parseFloat(e.target.value));
										audioEngine.updateDelayWet(parseFloat(e.target.value));
									}}
								/>
							</div>
							<div className="effect-control">
								<label htmlFor="filter">Filter: {Math.round(filterFreq)}Hz</label>
								<input
									type="range"
									min="20"
									max="20000"
									step="1"
									name="filter"
									value={filterFreq}
									onChange={(e) => {
										setFilterFreq(parseFloat(e.target.value));
										audioEngine.updateFilterFrequency(parseFloat(e.target.value));
									}}
								/>
							</div>
						</div>
						<PianoRoll kit={kit} bpm={bpm} />
					</main>
				)
			)}
		</div>
	);
};

export default Play;
