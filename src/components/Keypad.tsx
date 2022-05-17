import {
	DEFAULT_LETTERS,
	DEFAULT_ROW_1,
	DEFAULT_ROW_2,
	DEFAULT_ROW_3,
} from "../constants";
import { Letter } from "../schema/common";

interface Props {
	usedKeys: Letter;
	onClick: (arg: string) => void;
}

const Keypad = ({ usedKeys, onClick }: Props) => {
	return (
		<div className="keypad">
			{DEFAULT_LETTERS.map((l) => {
				if (l.key.includes("space_")) {
					return (
						<div className="space" key={l.key}>
							{l.icon}
						</div>
					);
				}

				const color = usedKeys[l.key] ?? "";
				const large = l.class ?? "";
				return (
					<button
						className={`key ${color} ${large}`}
						key={l.key}
						onClick={() => onClick(l.key)}
					>
						{l.icon ?? l.key}
					</button>
				);
			})}
		</div>
	);
};

export default Keypad;
