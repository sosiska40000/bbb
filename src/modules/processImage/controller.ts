import { RequestHandler } from "express";
import { PhotomathConnector } from "../photomathConnector/connector";
import { buildImageResponse } from "../../utils/responseBuilders";

const photomath = new PhotomathConnector();

export const processImage: RequestHandler = async (req, res, next) => {
	try {
		if (!req.file) throw new Error("No image uploaded");
		const result = await photomath.processImageGroups(req.file);
		const response = buildImageResponse(result.data);
		res.json(response)
	} catch (error) {
		next(error)
	}
}
