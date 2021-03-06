import type { CommitDiff } from './commit-diff';
import type { Milestone } from './milestone';
import type { Reference } from './reference';
import type { TaskCompletionStatus } from './task-completion-status';
import type { TimeStats } from './time-stats';
import type { User } from './user';

export interface MergeRequest {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  merged_by: Omit<User, 'created_at'>;
  merged_at: string;
  closed_by?: string;
  closed_at?: string;
  created_at: string;
  updated_at: string;
  target_branch: string;
  source_branch: string;
  upvotes: number;
  downvotes: number;
  author: Omit<User, 'created_at'>;
  assignee: Omit<User, 'created_at'>;
  assignees?: Omit<User, 'created_at'>[];
  reviewers?: Omit<User, 'created_at'>[];
  source_project_id: number;
  target_project_id: number;
  labels?: string[];
  work_in_progress: boolean;
  milestone: Milestone;
  merge_when_pipeline_succeeds: boolean;
  merge_status: string;
  sha: string;
  merge_commit_sha?: string;
  squash_commit_sha?: string;
  user_notes_count: number;
  discussion_locked?: string;
  should_remove_source_branch: boolean;
  force_remove_source_branch: boolean;
  web_url: string;
  references: Reference;
  time_stats: TimeStats;
  squash: boolean;
  task_completion_status: TaskCompletionStatus;
  has_conflicts: boolean;
  blocking_discussions_resolved: boolean;
  changes?: CommitDiff[];
}
