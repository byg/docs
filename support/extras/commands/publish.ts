import Git from '../util/Git';
import { gitCommit, isRunningOnTravis } from '../util/environment';
import { logger } from '../log';

export type PublishMode = 'publish' | 'commit' | 'skip';

export interface Options {
	branch: string;
	publishMode: (() => PublishMode) | PublishMode;
	repo: Git;
	username?: string;
	useremail?: string;
}

async function createCommitMessage(repo: Git): Promise<string> {
	const username = await repo.getConfig('user.name');
	const commit = gitCommit();
	let message = `Published by ${ username }`;

	if (commit) {
		message += ` from commit ${ commit }`;
	}

	return message;
}

export default async function publish(options: Options) {
	let publishMode = typeof options.publishMode === 'function' ? options.publishMode() : options.publishMode;
	// 修改为如果不是 travis 环境，也可以推送代码
	!isRunningOnTravis() ? publishMode = 'publish': '';
	const { branch, repo } = options;
	
	if (publishMode !== 'commit' && publishMode !== 'publish') {
		logger.info('skipping publish.');
		return;
	}

	const hasChanges = await repo.areFilesChanged();
	if (!hasChanges) {
		logger.info('No files changed. Skipping publish.');
		return;
	}

	if (publishMode === 'publish') {
		logger.info(`Publishing to ${ repo.cloneDirectory }`);
	}
	else {
		logger.info(`Committing ${ repo.cloneDirectory }. Skipping publish.`);
	}

	await repo.ensureConfig(options.username, options.useremail);

	// TODO check pre-requisites: cloneDir should exist (from sync); should be on branch (gh-pages);
	await repo.add('--all');
	await repo.commit(await createCommitMessage(repo));

	if (publishMode === 'publish') {
		await repo.push(branch);
	}
}
