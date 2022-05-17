import { useState } from "react";
import { v4 as uuid } from "uuid";
import { AnswerLetter, Letter } from "../schema/common";

const useWorlde = (solution: string) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState<Array<AnswerLetter[]>>([
		...Array(6),
	]);
	const [history, setHistory] = useState<string[]>([]);
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState<Letter>({});

	const formatGuess = () => {
		let array: (string | null)[] = [...solution];
		let guess = [...currentGuess].map<AnswerLetter>((l) => {
			return { key: l.toLowerCase(), color: "grey", id: uuid() };
		});

		guess.forEach((item, i) => {
			if (array[i] === item.key) {
				guess[i].color = "green";
				array[i] = null;
				return;
			}

			if (array.includes(item.key) && item.color !== "green") {
				guess[i].color = "yellow";
				array[array.indexOf(item.key)] = null;
				return;
			}
		});

		return guess;
	};

	const addNewGuess = (guess: AnswerLetter[]) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}

		setGuesses((prev) => {
			let newGuesses = [...prev];
			newGuesses[turn] = guess;
			return newGuesses;
		});

		setHistory((prev) => {
			return [...prev, currentGuess];
		});

		setTurn((prev) => prev + 1);
		setUsedKeys((prev) => {
			let newKeys = { ...prev };
			guess.forEach((l) => {
				const color = newKeys[l.key];
				if (l.color === "green") {
					newKeys[l.key] = "green";
					return;
				}

				if (l.color === "yellow" && color !== "green") {
					newKeys[l.key] = "yellow";
					return;
				}

				if (
					l.color === "grey" &&
					color !== "green" &&
					color !== "yellow"
				) {
					newKeys[l.key] = "grey";
					return;
				}
			});

			return newKeys;
		});
		setCurrentGuess("");
	};

	const handleKeyup = ({ key }: KeyboardEvent) => {
		if (key === "Enter") {
			if (turn > 5) return;
			if (history.includes(currentGuess)) return;
			if (currentGuess.length !== 5) return;

			const formatted = formatGuess();
			addNewGuess(formatted);
			return;
		}

		if (key === "Backspace") {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
			return;
		}

		if (!/^[a-zA-Z]$/g.test(key)) return;
		if (currentGuess.length > 4) return;

		setCurrentGuess((prev) => {
			return prev + key;
		});
	};

	const handleKeypadClick = (letter: string) => {
		if (isCorrect) return;

		if (letter === "enter") {
			if (turn > 5) return;
			if (history.includes(currentGuess)) return;
			if (currentGuess.length !== 5) return;
			addNewGuess(formatGuess());
			return;
		}

		if (letter === "backspace") {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
			return;
		}

		if (currentGuess.length > 4) return;
		setCurrentGuess((prev) => {
			return prev + letter;
		});
	};

	const reset = () => {
        setTurn(0);
		setHistory([]);
		setUsedKeys({});
        setIsCorrect(false);
		setCurrentGuess("");
		setGuesses([...Array(6)]);
	};

	return {
		turn,
		currentGuess,
		guesses,
		isCorrect,
		usedKeys,
		reset,
		handleKeyup,
		handleKeypadClick,
	};
};

export default useWorlde;
