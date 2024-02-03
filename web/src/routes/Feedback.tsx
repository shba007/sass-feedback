import { Link, useParams } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import TextField from '../components/Form/TextField';
import './Feedback.scss';
import { Feedback as FeedbackType } from '../components/FeedbackCard';
import axios from 'axios';
import { useQuery } from 'react-query';

function Feedback() {
	const { id } = useParams();

	const isEdit = Boolean(id !== undefined);

	const { data: feedback } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get(`http://localhost:3000/feedback/${id}`);
			return data as FeedbackType;
		},
	});

	return (
		<main id="feedback">
			<section className="action-bar">
				<Link to="/">Go Back</Link>
			</section>
			<form>
				<div className="logo">{!isEdit ? 'plus' : 'pen'}</div>
				<h1>{!isEdit ? 'Create New Feedback' : `Editing ‘${feedback?.title}’`}</h1>
				<div className="input-block">
					<label htmlFor="feedback-title">Feedback Title</label>
					<span>Add a short, descriptive headline</span>
					<TextField name="feedback-title" value={feedback?.title} />
				</div>
				<div className="input-block">
					<label htmlFor="feedback-category">Category</label>
					<span>Choose a category for your feedback</span>
					<TextField name="feedback-category" value={feedback?.category} />
				</div>
				{isEdit && (
					<div className="input-block">
						<label htmlFor="feedback-states">Update Status</label>
						<span>Change feature state</span>
						<TextField name="feedback-states" value={feedback?.status} />
					</div>
				)}
				<div className="input-block">
					<label htmlFor="feedback-description">Feedback Detail</label>
					<span>Include any specific comments on what should be improved, added, etc.</span>
					<TextField inline={false} name="feedback-description" value={feedback?.description} />
				</div>
				<div className="buttons">
					{isEdit && <CTAButton type="danger" label="Delete" />}
					<CTAButton type="neutral" label="Cancel" />
					<CTAButton type="primary" label="Add Feedback" />
				</div>
			</form>
		</main>
	);
}

export default Feedback;
