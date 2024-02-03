import { Link } from 'react-router-dom';
import './ActionBar.scss';
import CTAButton from './CTAButton';

function ActionBar({ page, suggestionCount }: { page: 'suggestion' | 'roadmap'; suggestionCount?: number }) {
	return (
		<div className="action-bar">
			{page === 'suggestion' ? (
				<>
					<h1>
						{/* TODO: add bulb icon */}
						{suggestionCount} Suggestions
					</h1>
					<span>Sort by : Most Upvotes</span>
				</>
			) : (
				<>
					<Link to="/">Go Back</Link>
					<h2>Roadmap</h2>
				</>
			)}
			<CTAButton to="/feedback" type="secondary" label="Add Feedback" />
		</div>
	);
}

export default ActionBar;
