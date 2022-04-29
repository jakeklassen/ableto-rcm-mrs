import type { User } from './user';

export interface ApprovedByEntity {
  user: Pick<
    User,
    'name' | 'username' | 'id' | 'state' | 'avatar_url' | 'web_url'
  >;
}

export interface MergeRequestLevelMergeRequestApproval {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  merge_status: string;
  approvals_required: number;
  approvals_left: number;
  approved_by?: ApprovedByEntity[];
}
