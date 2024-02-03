import { Link } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import Comment from '../components/Comment';
import FeedbackCard from '../components/FeedbackCard';
import TextField from '../components/Form/TextField';
import './FeedbackDetails.scss';

function FeedbackDetails() {
	const feedback = {
		id: 1,
		title: 'Add tags for solutions',
		category: 'enhancement',
		upvotes: 112,
		status: 'suggestion',
		description: 'Easier to search for solutions based on a specific stack.',
		comments: [
			{
				id: 1,
				content: 'Awesome idea! Trying to find framework-specific projects within the hubs can be tedious',
				user: {
					image: './assets/user-images/image-suzanne.jpg',
					name: 'Suzanne Chang',
					username: 'upbeat1811',
				},
			},
			{
				id: 2,
				content: 'Please use fun, color-coded labels to easily identify them at a glance',
				user: {
					image: './assets/user-images/image-thomas.jpg',
					name: 'Thomas Hood',
					username: 'brawnybrave',
				},
			},
		],
	};

	return (
		<main id="feedback-details">
			<section className="action-bar">
				<Link to="/">Go Back</Link>
				<CTAButton to="/feedback?edit=true" label="Edit Feedback" />
			</section>
			<FeedbackCard
				title={feedback.title}
				description={feedback.description}
				category={feedback.category}
				upvotes={feedback.upvotes}
				commentCount={feedback.comments?.length ?? 0}
			/>
			<section className="comments">
				<h3>4 Comments</h3>
				{feedback.comments.map(({ user, content }) => (
					<Comment image={user.image} name={user.name} username={user.username} content={content} />
				))}
			</section>
			<section className="comment-box">
				<h3>Add Comment</h3>
				<TextField name="comment" inline={false} placeholder="Type your comment here" />
				<div>
					<span>250 Characters left</span>
					<button>Post Comment</button>
				</div>
			</section>
		</main>
	);
}

export default FeedbackDetails;
