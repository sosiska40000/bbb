import { RequestHandler } from 'express';
import { buildCommandResponse } from '../../utils/responseBuilders';
import { PhotomathConnector } from '../photomathConnector/connector';

const photomath = new PhotomathConnector();

export const processCommand: RequestHandler = async (req, res, next) => {
	try {
		const { command } = req.body;
		const result = await photomath.processCommand(command);
		const response = buildCommandResponse(result.data);
		res.json(response);
	} catch (error) {
		next(error);
	}
};
