import React, { useEffect } from "react";
import useWorlde from "../hooks/useWorld";
import Grid from "./Grid";
import Keypad from "./Keypad";

interface Props {
	solution: string;
}

const Wordle = ({ solution }: Props) => {
	const {
		turn,
		guesses,
		isCorrect,
		usedKeys,
		currentGuess,
		reset,
		handleKeyup,
		handleKeypadClick,
	} = useWorlde(solution);

	useEffect(() => {
		window.addEventListener("keyup", handleKeyup);
		if (isCorrect || turn > 5) {
			window.removeEventListener("keyup", handleKeyup);
		}

		return () => window.removeEventListener("keyup", handleKeyup);
	}, [handleKeyup, isCorrect, turn]);

	return (
		<>
			<Grid
				currentGuess={currentGuess}
				guesses={guesses}
				turn={turn}
				reset={reset}
			/>
			<Keypad usedKeys={usedKeys} onClick={handleKeypadClick} />
		</>
	);
};

export default Wordle;
