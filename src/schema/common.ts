export interface Word {
	id: string;
	word: string;
}

export interface AnswerLetter {
	id: string;
	key: string;
	color: string;
}

export interface Letter {
	[key: string]: string;
}
