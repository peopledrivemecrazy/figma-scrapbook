import { CLIEND_ID, CLIENT_SECRET, APP_URL } from '$env/static/private';
import { Figma, OAuth2RequestError } from 'arctic';

export const figma = new Figma(CLIEND_ID, CLIENT_SECRET, `${APP_URL}/auth`);

export const refreshSession = async (refreshToken: string) => {
	try {
		const tokens = await figma.refreshAccessToken(refreshToken);
		const access_token = tokens.accessToken();
		const refresh_token = tokens.refreshToken();
		const expires_in = tokens.accessTokenExpiresInSeconds();

		return {
			access_token,
			refresh_token,
			expires_in
		};
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			console.log(e);
		}
	}
};
