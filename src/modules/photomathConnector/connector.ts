import axios, { AxiosHeaderValue, AxiosPromise, AxiosRequestConfig } from "axios";
import { cfg } from "./config";
import { Command, CommandResponse, ImageGroupsResponse, View } from "../../types/types";
import jpeg from "jpeg-js"

export class PhotomathConnector {
	private refreshToken: AxiosHeaderValue = null;
	private token: AxiosHeaderValue = null;
	public static instance: PhotomathConnector;

	constructor() {
		if (PhotomathConnector.instance) {
			return PhotomathConnector.instance;
		}
		PhotomathConnector.instance = this;
		this.init();
	};

	private init() {
		axios.put(cfg.authUrl, {
			providerId: cfg.providerId
		})
			.then((res) => {
				const { token, refreshToken } = res.data.content;
				this.token = "Bearer " + token;
				this.refreshToken = "Bearer " + refreshToken;
			})
			.catch((e) => {
				console.log(e);
			})

		setInterval(this.refresh, 1000 * 60 * 60 * 24);
	}

	private refresh() {
		axios.get(cfg.authUrl, { headers: { Authorization: this.refreshToken } })
			.then((res) => {
				const { token, refreshToken } = res.data.content;
				this.token = "Bearer " + token;
				this.refreshToken = "Bearer " + refreshToken;
			})
			.catch((e) => {
				console.log(e);
			})
	}

	public processImageGroups(file: Express.Multer.File): AxiosPromise<ImageGroupsResponse>{
		const metadata = jpeg.decode(file.buffer)
		const view: View = {
			x:0,
			y:0,
			width: metadata.width,
			height: metadata.height
		}
		const payload = { ...cfg.basePayload, view };
		const reqCfg: AxiosRequestConfig = { headers: { Authorization: this.token } }

		const formData = new FormData();
		formData.append("image", new Blob([file.buffer], { type: "image/jpeg" }));
		formData.append("json", new Blob([JSON.stringify(payload)], { type: "application/json" }));

		return axios.post<ImageGroupsResponse>(cfg.processImageGroupsUrl, formData, reqCfg);
	}

	public processCommand(command: Command): AxiosPromise<CommandResponse> {
		const payload = { ...cfg.basePayload, command };
		const reqCfg: AxiosRequestConfig = { headers: { Authorization: this.token } }
		return axios.post<CommandResponse>(cfg.processCommandUrl, payload, reqCfg);
	}
}

