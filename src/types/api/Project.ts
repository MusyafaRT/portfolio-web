import { Status } from "../Common";

export interface ProjectDetail {
  id: number;
  title: string;
  type: string;
  content: string;
  image?: string;
}

export interface ListProjectRes {
  status: Status;
  message: string;
  project: ProjectDetail[];
}
export interface ProjectDetailReq {
  id?: number;
}

export interface ProjectDetailRes {
  status: Status;
  message: string;
  project: ProjectDetail;
}
