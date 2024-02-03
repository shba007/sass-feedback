import './RoadmapCard.scss';
import StatusIndicator, { Status } from './StatusIndicator';

export interface RoadmapItem {
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

function RoadmapCard({ status, title, description, category, upvotes, commentCount }: RoadmapItem) {
	return (
		<div className="card" style={{ gridColumnStart: columStart[status] }}>
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
				<button className="comment-btn">{commentCount}</button>
			</div>
		</div>
	);
}

export default RoadmapCard;
