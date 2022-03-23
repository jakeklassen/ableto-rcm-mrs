export interface Namespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id?: number;
  avatar_url: string;
  web_url: string;
  billable_members_count: number;
  plan: string;
  trial_ends_on?: string;
  trial: boolean;
}
