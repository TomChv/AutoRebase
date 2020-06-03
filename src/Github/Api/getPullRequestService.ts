import {ApiPullRequest} from './apiPullRequest';
import {GitHub} from '@actions/github';
import {MergeableState} from '../../pullrequestinfo';

export interface GetPullRequestService {
    getPullRequest(ownerName: string, repoName: string, pullRequestNumber: number): Promise<ApiPullRequest>;
}

export class GithubGetPullRequestService implements GetPullRequestService {
    private github: GitHub;

    constructor(github: GitHub) {
        this.github = github;
    }

    async getPullRequest(ownerName: string, repoName: string, pullRequestNumber: number): Promise<ApiPullRequest> {
        const result = await this.github.pulls.get({
            owner: ownerName,
            repo: repoName,
            pull_number: pullRequestNumber,
        });

        return {
            mergeable_state: result.data.mergeable_state as MergeableState,
        };
    }
}