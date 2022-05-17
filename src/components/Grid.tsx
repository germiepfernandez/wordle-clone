import { AnswerLetter } from "../schema/common";
import { useFetchRandomWordQuery } from "../store/api/wordApi";
import Row from "./Row";

interface Props {
	currentGuess: string;
	guesses: Array<AnswerLetter[]>;
	turn: number;
	reset: () => void;
}
const Grid = ({ currentGuess, guesses, turn, reset }: Props) => {
	const { refetch } = useFetchRandomWordQuery();

	const handleReset = () => {
		reset();
		refetch();
	};

	return (
		<div>
			<button onClick={handleReset}>Reset</button>
			<div>
				{guesses.map((g, i) => {
					return (
						<Row
							key={g ? JSON.stringify(g) : i}
							guess={g}
							currentGuess={
								turn === i ? currentGuess : ""
							}
							latest={turn === i + 1}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Grid;
