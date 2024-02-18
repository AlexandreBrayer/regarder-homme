import { error } from 'sveltekit-api';

const defaultErrors = {
	400: error(400, 'Bad Request'),
	401: error(401, 'Unauthorized'),
	403: error(403, 'Forbidden'),
	404: error(404, 'Not Found'),
	405: error(405, 'Method Not Allowed'),
	406: error(406, 'Not Acceptable'),
	408: error(408, 'Request Timeout'),
	409: error(409, 'Conflict'),
	410: error(410, 'Gone'),
	429: error(429, 'Too Many Requests'),
	500: error(500, 'Internal Server Error'),
	501: error(501, 'Not Implemented'),
	502: error(502, 'Bad Gateway'),
	503: error(503, 'Service Unavailable'),
	504: error(504, 'Gateway Timeout')
};

type ErrorCode = keyof typeof defaultErrors;

export function pickErrors(codes: ErrorCode[]) {
	return codes.reduce(
		(acc, code) => {
			acc[code] = defaultErrors[code];
			return acc;
		},
		{} as Record<ErrorCode, ReturnType<typeof error>>
	);
}
