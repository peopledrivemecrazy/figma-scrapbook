import * as Figma from 'figma-api';

export const api = async (token: string) => {
	const figmaApi = new Figma.Api({ oAuthToken: token });
	const whoAmI = async () => await figmaApi.getMe();
	return { whoAmI };
};
