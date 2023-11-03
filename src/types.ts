export interface tHnBlogPost {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
}

export interface Document {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  name: string;
  time: string;
  description: string;
}
