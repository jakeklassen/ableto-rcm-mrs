import { authors } from "~/config/authors";
import { MergeRequest } from "./types/merge-request";
import { MergeRequestLevelMergeRequestApproval } from "./types/merge-request-approval";
import { Project } from "./types/project";

type MergeRequestWithAdditonalData = MergeRequest & {
  project: Project;
  approvals: MergeRequestLevelMergeRequestApproval;
};

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

    const authorMergeRequestsWithProject: MergeRequestWithAdditonalData[] =
      await Promise.all(
        authorMergeRequests.map(
          async (mergeRequest): Promise<MergeRequestWithAdditonalData> => {
            const project: Project = await fetch(
              `https://gitlab.com/api/v4/projects/${mergeRequest.project_id}?` +
                new URLSearchParams({
                  private_token: privateToken,
                }),
            ).then((res) => res.json());

            const approvals: MergeRequestLevelMergeRequestApproval =
              await fetch(
                `https://gitlab.com/api/v4/projects/${mergeRequest.project_id}/merge_requests/${mergeRequest.iid}/approvals?` +
                  new URLSearchParams({
                    private_token: privateToken,
                  }),
              ).then((res) => res.json());

            return { ...mergeRequest, project, approvals };
          },
        ),
      );

    mergeRequests.push(...authorMergeRequestsWithProject);
  }

  return mergeRequests;
};
