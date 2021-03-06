import { join } from 'path';
import { exec, promisify } from '../extras/util/process';
import { logger } from '../extras/log';

function generateHexo(siteDirectory: string, configs: string[] = ['_config.yml'], flags: string[] = []) {
	const hexoBin = join('node_modules', '.bin', 'hexo');
	logger.info(`${hexoBin} --config=${configs.join(',')} generate ${flags.join(',')}`);
	const proc = exec(`${hexoBin} --config=${configs.join(',')} generate ${flags.join(',') }`, { silent: false, cwd: siteDirectory });
	return promisify(proc);
}

export interface Options {
	configs: string[];
	siteDirectory: string;
	flags: string[];
}

export async function hexo(options: Options) {
	const { siteDirectory, configs, flags } = options;
	await generateHexo(siteDirectory, configs, flags);
}

export async function hexoClean(targetDirectory: string) {
	const hexoBin = join('node_modules', '.bin', 'hexo');
	const proc = exec(`${ hexoBin } clean`, { silent: false, cwd: targetDirectory });
	await promisify(proc);
}
