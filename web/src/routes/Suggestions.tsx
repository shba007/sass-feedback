import { useEffect, useState } from 'react';
import FeedbackCard, { Feedback } from '../components/FeedbackCard';
import ActionBar from '../components/ActionBar';

import './Suggestions.scss';
import StatusIndicator, { Status } from '../components/StatusIndicator';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

function Suggestions() {
	const categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
	const [activeTagIndex, setActiveTagIndex] = useState(0);

	const [status, setStatus] = useState<{ suggestion: number; planned: number; 'in-progress': number; live: 0 }>({
		suggestion: 0,
		planned: 0,
		'in-progress': 0,
		live: 0,
	});

	const { data: feedbacks } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get<Feedback[]>('http://localhost:3000/feedback');
			return data;
		},
	});

	useEffect(() => {
		if (!feedbacks || !feedbacks.length) return;

		console.log(feedbacks);
		const newStatus = feedbacks.reduce((acc, { status }) => {
			if (acc[status]) acc[status] += 1;
			else acc[status] = 1;

			return acc;
		}, {} as any);

		console.log(newStatus);
		setStatus(newStatus);
	}, [feedbacks]);

	return (
		<main id="suggestion">
			<aside>
				<div className="title-board">
					<h2>Eqaim</h2>
					<h3>Feedback Board</h3>
				</div>
				<div className="category-board">
					{categories.map((category, index) => (
						<button key={category} className={`category-option ${index == activeTagIndex ? 'active' : ''}`} onClick={() => setActiveTagIndex(index)}>
							{category}
						</button>
					))}
				</div>
				<div className="roadmap-board">
					<h2>Roadmap</h2>
					<Link to="/roadmap">View</Link>
					{Object.entries(status).map(([type, count]) => type !== 'suggestion' && <StatusIndicator key={type} type={type as Status} count={count} />)}
				</div>
			</aside>
			<section>
				<ActionBar page="suggestion" suggestionCount={status.suggestion} />
				{!feedbacks || !feedbacks?.length ? (
					<div className="empty-state">
						<h1>There is no feedback yet.</h1>
						<p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
						<button className="add-feedback-btn">Add Feedback</button>
					</div>
				) : (
					<div className="feedbacks">
						{feedbacks.map(({ id, title, status, description, category, upvotes, commentCount }) => (
							<FeedbackCard
								key={id}
								id={id}
								status={status}
								title={title}
								description={description}
								category={category}
								upvotes={upvotes}
								commentCount={commentCount}
							/>
						))}
					</div>
				)}
			</section>
		</main>
	);
}

export default Suggestions;
