import { User } from './user';

export class Post {
  user: User;
  created_at: Date;
  content: string;
}
