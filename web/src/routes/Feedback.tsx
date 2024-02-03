import { Link, useNavigate, useParams } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import TextField from '../components/Form/TextField';
import './Feedback.scss';
import { Feedback as FeedbackType } from '../components/FeedbackCard';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { FormEvent } from 'react';

// @ts-ignore
const apiUrl = import.meta.env.VITE_API_URL;

function Feedback() {
	const navigate = useNavigate();
	const { id } = useParams();
	const isEdit = Boolean(id !== undefined);

	const { data: feedback } = useQuery({
		queryFn: async () => {
			if (!isEdit) return;

			const { data } = await axios.get(`${apiUrl}/feedback/${id}`);
			return data as FeedbackType;
		},
	});

	const mutation = useMutation({
		mutationFn: async (formData) => {
			const { data } = await (!isEdit ? axios.post(`${apiUrl}/feedback`, formData) : axios.put(`${apiUrl}/feedback/${id}`, formData));
			return data as FeedbackType;
		},
	});

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData: any = {};

		const data = new FormData(event.currentTarget);
		for (let [key, value] of data.entries()) {
			formData[key.split('-')[1]] = value;
		}
		console.log(data);
		mutation.mutate(formData);

		navigate('/');
	}

	return (
		<main id="feedback">
			<section className="action-bar">
				<Link to="/">Go Back</Link>
			</section>
			<form onSubmit={onSubmit}>
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
					<CTAButton to="/" type="neutral" label="Cancel" />
					<CTAButton type="primary" label="Add Feedback" />
				</div>
			</form>
		</main>
	);
}

export default Feedback;
