import { CLIEND_ID, CLIENT_SECRET, APP_URL } from '$env/static/private';
import { Figma } from 'arctic';

export const figma = new Figma(CLIEND_ID, CLIENT_SECRET, `${APP_URL}/oauth`);
