import { FC } from "react";

export interface IComment {
  text: string;
  author: string;
  score?: number;
}

const Comment: FC<IComment> = ({ text, author, score }) => {
  return (
    <div>
      <div>{author}</div>
      <div>{text}</div>
      <div>score: {score ? score : 'unknown'}</div>
    </div>
  );
};

export default Comment;
