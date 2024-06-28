import { ICommentItem } from "./commentItem/commentBlock";
import { FC } from "react";
import CommentBlock from "./commentItem/commentBlock";
export interface ICommentsListProps {
  enhancedComments: unknown[];
  addComment: any;
}

const CommentList: FC<ICommentsListProps> = ({
  enhancedComments,
  addComment,
}) => {
  return (
    <>
      {enhancedComments.map((comment, key) => {
        let commentItem = comment as ICommentItem;
        return (
          <CommentBlock
            key={key}
            comment={commentItem}
            addComment={addComment}
          />
        );
      })}
    </>
  );
};

export default CommentList;
