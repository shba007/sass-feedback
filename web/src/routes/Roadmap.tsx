import axios from 'axios';
import { useQuery } from 'react-query';

import './Roadmap.scss';
import ActionBar from '../components/ActionBar';
import RoadmapCard from '../components/RoadmapCard';
import { Feedback } from '../components/FeedbackCard';
import { useState, useEffect } from 'react';

function Roadmap() {
	const headings = [
		{
			title: 'Planned',
			details: 'Ideas prioritized for research',
			count: 2,
		},
		{
			title: 'In-Progress',
			details: 'Currently being developed',
			count: 3,
		},
		{
			title: 'Live',
			details: 'Released features',
			count: 1,
		},
	];

	const { data: roadmapItems } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get('http://localhost:3000/feedback');

			return data as Feedback[];
		},
	});

	const [screenSm, setScreenSm] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 640) {
			setScreenSm(true);
		} else {
			setScreenSm(false);
		}
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	});

	return (
		<main id="roadmap">
			<ActionBar page="roadmap" />
			<div className="board">
				{headings.map(({ title, details, count }, index) => (
					<div key={title} className="head" style={{ gridColumnStart: index + 1 }}>
						<h2>
							{title} ({count})
						</h2>
						{!screenSm && <span>{details}</span>}
					</div>
				))}
				{roadmapItems &&
					roadmapItems
						.filter(({ status }) => status !== 'suggestion')
						.map(({ id, status, title, description, category, upvotes, commentCount }) => (
							<RoadmapCard
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
		</main>
	);
}

export default Roadmap;
