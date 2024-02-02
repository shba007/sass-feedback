import './Feedback.scss';

interface Feedback {
	title: string;
	description: string;
	category: string;
	upvotes: number;
	commentCount: number;
}

function Feedback({ title, description, category, upvotes, commentCount }: Feedback) {
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
			<button className="comment">{commentCount}</button>
		</div>
	);
}

export default Feedback;
