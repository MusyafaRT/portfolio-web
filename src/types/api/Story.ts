import { Status } from "../Common";

export interface StoryDetail {
  id: number;
  contentImage?: string;
}

export interface ListStoryRes {
  status: Status;
  message: string;
  story: StoryDetail[];
}
