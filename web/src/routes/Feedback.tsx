import { Link } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import TextField from '../components/Form/TextField';
import './Feedback.scss';

function Feedback({ create = false }: { create?: boolean }) {
	return (
		<main id="feedback">
			<section className="action-bar">
				<Link to="/">Go Back</Link>
			</section>
			<form>
				<div className="logo">{create ? 'plus' : 'pen'}</div>
				<h1>{create ? 'Create New Feedback' : 'Editing ‘Add a dark theme option’'}</h1>
				<div className="input-block">
					<label htmlFor="feedback-title">Feedback Title</label>
					<span>Add a short, descriptive headline</span>
					<TextField name="feedback-title" />
				</div>
				<div className="input-block">
					<label htmlFor="feedback-category">Category</label>
					<span>Choose a category for your feedback</span>
					<TextField name="feedback-category" />
				</div>
				{!create && (
					<div className="input-block">
						<label htmlFor="feedback-states">Update Status</label>
						<span>Change feature state</span>
						<TextField name="feedback-states" />
					</div>
				)}
				<div className="input-block">
					<label htmlFor="feedback-description">Feedback Detail</label>
					<span>Include any specific comments on what should be improved, added, etc.</span>
					<TextField inline={false} name="feedback-description" />
				</div>
				<div className="buttons">
					{!create && <CTAButton type="danger" label="Delete" />}
					<CTAButton type="neutral" label="Cancel" />
					<CTAButton type="primary" label="Add Feedback" />
				</div>
			</form>
		</main>
	);
}

export default Feedback;
