import './ActionBar.scss';

function ActionBar({ page }: { page: 'suggestion' | 'roadmap' }) {
	return (
		<div className="action-bar">
			{page === 'suggestion' ? (
				<>
					<h1>{/* TODO: add bulb icon */}6 Suggestions</h1>
					<span>Sort by : Most Upvotes</span>
				</>
			) : (
				<>
					<a>Go Back</a>
					<h2>Roadmap</h2>
				</>
			)}
			<button className="add-feedback-btn">Add Feedback</button>
		</div>
	);
}

export default ActionBar;
