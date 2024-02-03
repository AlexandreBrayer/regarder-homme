import { PYTHON_PATH, WATCHMAN_ROOT } from '$env/static/private';
import { promisify } from 'util';
import { exec as execCallBack } from 'child_process';

const exec = promisify(execCallBack);

class ExecError extends Error {
	code: number;

	constructor(message: string, code: number) {
		super(message);
		this.name = 'ExecError';
		this.code = code;
	}
}

export default async function getNames(): Promise<string[]> {
	try {
		const { stdout, stderr } = await exec(`${PYTHON_PATH} ${WATCHMAN_ROOT} get_names`);
		if (stderr) {
			throw new ExecError(stderr, 1);
		}
		try {
			const names = JSON.parse(stdout);
			return names;
		} catch (error) {
			throw new Error(`Error parsing JSON: ${stdout}`);
		}
	} catch (error) {
		if (error instanceof ExecError) {
			throw new Error(`Error executing command: ${error.message} with code ${error.code}`);
		} else {
			throw error;
		}
	}
}
