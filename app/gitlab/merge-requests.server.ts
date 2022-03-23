import { authors } from "~/config/authors";
import { MergeRequest } from "./types/merge-request";
import { Project } from "./types/project";

type MergeRequestWithProject = MergeRequest & { project: Project };

export const getMergeRequests = async () => {
  const privateToken = process.env.GITLAB_PRIVATE_TOKEN;

  if (privateToken == null) {
    throw new Error("GitLab private token not found.");
  }

  const mergeRequests = [];

  for (const author of authors) {
    const params = new URLSearchParams({
      private_token: privateToken,
      author_username: author.gitlabUsername,
      state: "opened",
      scope: "all",
    });

    const authorMergeRequests: MergeRequest[] = await fetch(
      "https://gitlab.com/api/v4/merge_requests?" + params,
    ).then((res) => res.json());

    const authorMergeRequestsWithProject: MergeRequestWithProject[] =
      await Promise.all(
        authorMergeRequests.map(
          async (mergeRequest): Promise<MergeRequestWithProject> => {
            mergeRequest.project = await fetch(
              `https://gitlab.com/api/v4/projects/${mergeRequest.project_id}?` +
                new URLSearchParams({
                  private_token: privateToken,
                }),
            ).then((res) => res.json());

            return mergeRequest as MergeRequestWithProject;
          },
        ),
      );

    mergeRequests.push(...authorMergeRequestsWithProject);
  }

  return mergeRequests;
};
