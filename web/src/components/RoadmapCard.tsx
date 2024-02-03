import { Link } from 'react-router-dom';
import './RoadmapCard.scss';
import StatusIndicator, { Status } from './StatusIndicator';
import { useEffect, useState } from 'react';

export interface RoadmapItem {
	id: number;
	status: Status;
	title: string;
	description: string;
	category: string;
	upvotes: number;
	commentCount: number;
}

const statusColor = {
	planned: '#F49F85',
	'in-progress': '#AD1FEA',
	live: '#62BCFA',
	suggestion: 'green',
};

const columStart = {
	planned: 1,
	'in-progress': 2,
	live: 3,
	suggestion: 4,
};

function RoadmapCard({ id, status, title, description, category, upvotes, commentCount }: RoadmapItem) {
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
		<div className="card" style={{ gridColumnStart: screenSm ? 1 : columStart[status], gridColumnEnd: screenSm ? 4 : columStart[status] + 1 }}>
			<div className="bar" style={{ backgroundColor: statusColor[status] }} />
			<StatusIndicator type={status} />
			<h1>{title}</h1>
			<p>{description}</p>
			<button className="category-option">{category}</button>
			<div className="action-buttons">
				<button className="upvote">
					<span />
					<span>{upvotes}</span>
				</button>
				<Link to={`/details/${id}`} className="comment-btn">
					{commentCount}
				</Link>
			</div>
		</div>
	);
}

export default RoadmapCard;
