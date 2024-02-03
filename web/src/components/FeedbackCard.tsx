import { Link } from 'react-router-dom';
import './FeedbackCard.scss';

export interface Feedback {
	title: string;
	description: string;
	category: string;
	upvotes: number;
	commentCount: number;
}

function FeedbackCard({ title, description, category, upvotes, commentCount }: Feedback) {
	return (
		<div className="feedback">
			<button className="upvote">
				<span />
				<span>{upvotes}</span>
			</button>
			<div className="content">
				<h1>{title}</h1>
				<p>{description}</p>
				<button className="category-option">{category}</button>
			</div>
			<Link to="/details" className="comment-btn">
				{commentCount}
			</Link>
		</div>
	);
}

export default FeedbackCard;
