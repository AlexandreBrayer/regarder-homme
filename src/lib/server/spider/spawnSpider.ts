import { PYTHON_PATH, WATCHMAN_ROOT } from '$env/static/private';
import { spawn } from 'child_process';

export default function spawnSpider(name: string): void {
	const process = spawn(PYTHON_PATH, [WATCHMAN_ROOT, 'spawn', name]);
	process.on('close', (code) => {
		if (code !== 0) {
			console.error(`spawnSpider process exited with code ${code}`);
		}
	});
	process.on('error', (error) => {
		console.error(`spawnSpider process error: ${error}`);
	});
	process.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
}
