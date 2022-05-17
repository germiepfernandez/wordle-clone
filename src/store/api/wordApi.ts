import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Word } from "../../schema/common";

const BASE_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

console.log(BASE_URL);
export const wordApi = createApi({
	reducerPath: "wordApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		fetchRandomWord: builder.query<string, void>({
			query: () => ({
				url: `randomWords`,
				params: {
					hasDictionaryDef: true,
					minCorpusCount: 0,
					minLength: 5,
					maxLength: 5,
					limit: 1,
					api_key: API_KEY,
				},
			}),
			transformResponse: (response: Word[]) => {
				return response[0].word.toLowerCase();
			},
		}),
	}),
});

export const { useFetchRandomWordQuery } = wordApi;
