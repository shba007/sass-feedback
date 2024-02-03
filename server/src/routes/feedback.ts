import express, { Response } from "express";
import { Data, Error } from "../main";

const router = express.Router()

interface Feedback {
	id: string;
	status: string;
	title: string;
	description: string;
	category: string;
	upvotes: number;
	commentCount: number;
}

interface DetailedFeedback extends Feedback {

}

// Get all Feedback
router.get('/', (req, res: Response<Array<Feedback>>) => {
	const data = req.app.locals.data as Data[];

	const result = data.map(({ id, status, title, description, category, upvotes, comments }) => ({
		id: `${id}`,
		status,
		title,
		description,
		category,
		upvotes,
		commentCount: comments?.length ?? 0,
	}))

	res.json(result)
})

// Get a Feedback
router.get('/:id', (req, res: Response<DetailedFeedback | Error>) => {
	const data = req.app.locals.data as Data[];
	const { id: feedbackId } = req.params

	const result = data.find(({ id }) => feedbackId === `${id}`)
	if (result === undefined) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	res.json({
		id: feedbackId,
		status: result?.status,
		title: result?.title,
		description: result?.description,
		category: result?.category,
		upvotes: result?.upvotes,
		commentCount: result?.comments?.length ?? 0,
	})
})

// Add a Feedback
router.post('/', (req, res: Response<Feedback>) => {
	const data = req.app.locals.data as Data[];
	const { title, description, category } = req.body

	const feedback: Omit<Feedback, 'commentCount'> = {
		id: `${data.length + 1}`,
		title,
		description,
		category,
		status: 'planned',
		upvotes: 0,
	}

	data.push({
		...feedback,
		id: data.length + 1,
		comments: []
	})

	res.status(201).json({ ...feedback, commentCount: 0 })
})

// Update a Feedback
router.put('/:id', (req, res: Response<Feedback | Error>) => {
	const data = req.app.locals.data as Data[];

	const { id: feedbackId } = req.params
	const { title, description, status, category } = req.body as Omit<Feedback, 'id' | 'upvotes' | 'commentCount'>

	const result = data.find(({ id }) => feedbackId === `${id}`)
	if (result === undefined) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	// Find the feedback
	// Update the feedback
	// Return the updated Feedback
})

// Delete a Feedback
router.delete('/:id', (req, res: Response<{ message: string } | Error>) => {
	const data = req.app.locals.data as Data[];
	const { id: feedbackId } = req.params

	const result = data.find(({ id }) => feedbackId === `${id}`)
	if (result === undefined) {
		res.status(404).json({ code: 404, message: `Feedback id ${feedbackId} not found` })
		return
	}

	data.splice(0, data.length, ...data.filter(({ id }) => feedbackId !== `${id}`))

	res.status(410).json({ message: 'Successfully Deleted' })
})

export default router