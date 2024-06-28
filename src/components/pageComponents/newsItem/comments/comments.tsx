import { ICommentListItemAPI, ICommentItem } from "./commentItem/commentBlock";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CommentList from "./commentsList";
import { getComments } from "../../../../shared/functions/API/getCommentsByIds";

export interface ICommentListState {
  [key: number]: ICommentItem;
}

const getNewComment = (
  comment: ICommentListItemAPI,
  isRootNode = false,
  parentNodeId: number | null
): ICommentItem => {
  return {
    id: comment.id,
    text: comment.text,
    deleted: comment.deleted,
    by: comment.by,
    time: comment.time,
    kids: comment.kids,
    childComments: [],
    isRootNode,
    parentNodeId,
  };
};

const Comments = () => {
  const params = useParams();

  const [commentsUpdating, setCommentsUpdating] = useState(false);
  const [commentsError, setCommentsError] = useState<null | string>(null);
  const [comments, setComments] = useState<ICommentListState>([]);

  const [open, setOpen] = useState(false);

  const addComment = (parentId: number | null, newComment: ICommentItem) => {
    let newCommentFunc = null;
    if (parentId !== null) {
      newComment = getNewComment(newComment, false, parentId);
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childComments: [
            ...(comments[parentId].childComments as number[]),
            newComment.id,
          ],
        },
      }));
    } else {
      newComment = getNewComment(newComment, true, null);
    }
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
  };

  const commentMapper: any = (comment: ICommentItem) => {
    return {
      ...comment,
      childComments: comment.childComments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };

  const enhancedComments = Object.values(comments)
    .filter((comment) => {
      return !comment.parentNodeId;
    })
    .map(commentMapper);

  const setCommentsState = (id: number) => {
    getComments(Number(id))
      .then((res: ICommentListItemAPI[] | undefined) => {
        if (res) {
          for (let i = 0; i < res.length; i++) {
            let el: ICommentItem = {
              ...res[i],
              parentNodeId: null,
              childComments: [],
              isRootNode: true,
            };

            addComment(null, el);
          }
        }
        setCommentsError(null);
        setCommentsUpdating(false);
      })
      .catch((err: Error) => {
        setCommentsUpdating(false);
        setCommentsError(err.name);
      });
  };

  const loadingComments = () => {
    if (params?.id && !isNaN(Number(params?.id))) {
      setCommentsState(Number(params.id));
    }
  };

  const updateComments = () => {
    if (params?.id && !isNaN(Number(params?.id))) {
      setCommentsState(Number(params.id));
    }
  };

  useEffect(() => {
    setCommentsUpdating(true);
    setComments([]);
    loadingComments();
  }, []);

  const onClickUpdate = () => {
    setCommentsUpdating(true);
    setComments([]);
    updateComments();
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        style={{ color: "black", marginTop: 20 }}
      >
        {open ? "Закрыть" : "Открыть"} комментарии
      </button>
      {open && (
        <CommentList
          enhancedComments={enhancedComments}
          addComment={addComment}
        />
      )}
    </>
  );
};

export default Comments;
