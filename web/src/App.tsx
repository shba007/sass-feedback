import { Route, Routes } from 'react-router-dom';

import Suggestions from './routes/Suggestions';
import Roadmap from './routes/Roadmap';
import FeedbackDetails from './routes/FeedbackDetails';
import Feedback from './routes/Feedback';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Suggestions />} />
			<Route path="/roadmap" element={<Roadmap />} />
			<Route path="/details" element={<FeedbackDetails />} />
			<Route path="/feedback" element={<Feedback />} />
		</Routes>
	);
}

export default App;
