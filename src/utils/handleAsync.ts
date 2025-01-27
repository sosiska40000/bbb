import { RequestHandler } from "express";

export const handleAsync = (fn: RequestHandler): RequestHandler => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
