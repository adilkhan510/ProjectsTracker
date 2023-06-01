export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Project {
  name: string;
  ownerId: string;
}

export interface Task {
  title: string;
  tasks: string[];
}

export type JWT = string;
