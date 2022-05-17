import Wordle from "./components/Wordle";
import { useFetchRandomWordQuery } from "./store/api/wordApi";

const App = () => {
	const { data } = useFetchRandomWordQuery();

	return (
		<>
			<h1 className="header">Wordle (Lingo)</h1>
			<div className="body">
				{data && <Wordle solution={data} />}
			</div>
		</>
	);
};

export default App;
