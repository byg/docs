import { repositorySource } from '../extras/util/environment';
import { join } from 'path';


// ---------------------------------------------------------------------------------------------------------------------
// Variables
// ---------------------------------------------------------------------------------------------------------------------
export const [ repoOwner, repoName ] = repositorySource().split('/');

export const dojoProjectOwner = 'dojo';

export const ghPagesBranch = 'gh-pages';

export const binDirectory = join('node_modules', '.bin');

export const distDirectory = '_dist';

export const siteDirectory = 'hexo';

export const syncDirectory = '.sync';

export const publishDirectory = '.ghpublish';

// This is considered the master branch as far as the CI is concerned
export const masterBranch = 'master';

// ---------------------------------------------------------------------------------------------------------------------
// Task Configuration
// ---------------------------------------------------------------------------------------------------------------------
export const clean = {
	dist: [ '<%= distDirectory %>' ],
	publish: [ '<%= publishDirectory %>' ],
	sync: [ '<%= syncDirectory %>' ],
	compiledFiles: [ './+(tests|support)/**/*.d.ts', './+(tests|support)/**/*.js' ]
};

export const concurrent = {
	options: {
		logConcurrentOutput: true
	},
	build: {
		tasks: ['hexo', 'docviewer']
	}
};

export const hexo = {
	generate: {
		src: '<%= siteDirectory %>',
		dest: '<%= distDirectory %>'
	}
};

export const docviewer = {
	build: {}
};

export const intern = {
	version: 4
};

export const prompt = {
	github: {
		options: {
			questions: [
				{
					config: 'github.username',
					type: 'input',
					message: 'Github username'
				},
				{
					config: 'github.password',
					type: 'password',
					message: 'Github password'
				}
			]
		}
	}
};

export const publish = {
	'gh-pages': {
		options: {
			branch: 'gh-pages',
			cloneDirectory: '<%= distDirectory %>'
		}
	}
};

export const initAutomation = {
	repo: {
		options: {
			repoOwner: '<%= repoOwner %>',
			repoName: '<%= repoName %>'
		}
	}
};

export const shell = {
	'build-tests': {
		command: 'tsc',
		options: {
			execOptions: {
				cwd: 'tests'
			}
		}
	},
	'build-ts': {
		command: 'tsc',
		options: {
			execOptions: {
				cwd: 'support'
			}
		}
	}
};

export const sync = {
	'gh-pages': {
		options: {
			branch: 'gh-pages',
			cloneDirectory: '<%= distDirectory %>'
		}
	}
};

export const tslint = {
	options: {
		configuration: 'tslint.json'
	},
	support: 'support/**/*.ts',
	site: ['hexo/**/*.ts', '!hexo/node_modules/**' ]
};

