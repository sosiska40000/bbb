export const cfg = {
	providerId: "CA2F547A-7A17-4506-87BE-78134AF6494B",
	authUrl: "https://lapi.photomath.net/v5/me",
	processCommandUrl: "https://rapi.photomath.net/v1/process-command",
	processImageGroupsUrl: "https://rapi.photomath.net/v1/process-image-groups",
	basePayload: {
		configuration: {
			features: {
				allowMissingTranslations: false,
				imageCollectionOptOut: false,
				debug: false,
				underaged: false,
				problemDatabase: false,
				bookpoint: false,
				inlineAnimations: "Variant1"
			},
			personalization: {
				preferredMulType: "vertical",
				preferredDivType: "horizontal",
				locale: "ru"
			}
		}
	}
}

