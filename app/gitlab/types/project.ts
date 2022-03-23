import { Namespace } from "./namespace";

export interface Project extends Record<string, unknown> {
  id: number;
  description?: string;
  default_branch: string;
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url: string;
  tag_list?: string[];
  topics?: string[];
  name: string;
  name_with_namespace: string;
  namespace: Pick<
    Namespace,
    "id" | "name" | "path" | "kind" | "full_path" | "avatar_url" | "web_url"
  >;
  path: string;
  path_with_namespace: string;
  created_at: string;
  last_activity_at: string;
  forks_count: number;
  avatar_url: string;
  star_count: number;
}
