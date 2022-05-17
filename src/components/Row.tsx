import { gsap, Power3 } from "gsap";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { AnswerLetter } from "../schema/common";

interface Props {
	guess: AnswerLetter[];
	currentGuess: string;
	latest: boolean;
}

const Row = ({ guess, currentGuess, latest }: Props) => {
	useEffect(() => {
		if (latest) {
			gsap.to(".latest", {
				keyframes: {
					"25%": {
						rotateX: 90,
						backgroundColor: "white",
						borderColor: "#333",
					},
					"55%": {
						rotateX: 90,
						backgroundColor: "var(--background)",
						borderColor: "var(--border-color)",
						color: "#eee",
					},
					"100%": {
						rotateX: 0,
						backgroundColor: "var(--background)",
						borderColor: "var(--border-color)",
						color: "#eee",
					},
				},
				stagger: 0.2,
				ease: Power3.easeInOut,
				duration: 1,
			});
		}
	}, [latest]);

	if (guess) {
		return (
			<div className="row past">
				{guess.map((l) => {
					let cx = `${l.color} ${latest ? "latest" : ""}`;
					return (
						<div key={l.id} className={cx}>
							{l.key}
						</div>
					);
				})}
			</div>
		);
	}

	if (currentGuess) {
		let letters = currentGuess.split("");
		return (
			<div className="row current">
				{letters.map((l, i) => {
					// console.log(`${l}_${i}`);
					return (
						<div key={i} className="filled">
							{l}
						</div>
					);
				})}
				{[...Array(5 - letters.length)].map((l) => (
					<div key={uuid()}></div>
				))}
			</div>
		);
	}

	return (
		<div className="row">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Row;
