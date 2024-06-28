import Comment from "./comment";
import { FC, useState } from "react";
import styles from "./styles.module.css";
import { getCommentsByIds } from "../../../../../shared/functions/API/getCommentsByIds";

export interface ICommentListItemAPI {
  by?: string;
  time?: number;
  kids?: number[];
  id: number;
  text?: string;
  deleted: boolean;
  score?: number;
}

export interface ICommentItem extends ICommentListItemAPI {
  isRootNode: boolean;
  parentNodeId: number | null;
  childComments: number[];
}

interface ICommentBlock {
  comment: ICommentItem;
  addComment: any;
}

const CommentBlock: FC<ICommentBlock> = ({ comment, addComment }) => {
  const { text, id, by, time, kids, childComments, score } = comment;
  const [showChild, setShowChild] = useState(false);
  const [loadingChild, setLoadingChild] = useState(false);
  const [isGetChild, setIsGetChild] = useState(false);

  return (
    <div className={styles.container}>
      <Comment score={score} text={text ? text : ""} author={by ? by : "unknown"} />

      {kids && kids?.length > 0 && childComments.length === 0 ? (
        <>
          <button
            style={{ margin: "10px 0 0 0" }}
            onClick={() => {
              if (typeof addComment === "function") {
                setLoadingChild(true);
                getCommentsByIds(kids)
                  .then((res) => {
                    for (let i = 0; i < res.length; i++) {
                      let el: ICommentItem = {
                        ...res[i],
                        parentNodeId: null,
                        childComments: [],
                        isRootNode: true,
                      };

                      addComment(id, el);
                    }

                    setLoadingChild(false);
                    setIsGetChild(true);
                    setShowChild(true);
                  })
                  .catch(() => {});
              }
            }}
          >
            Загрузить ответы
          </button>
        </>
      ) : (
        <>
          {childComments.length > 0 && (
            <button
              style={{ margin: "10px 0 0 0" }}
              onClick={() => {
                setShowChild(!showChild);
              }}
            >
              {showChild ? "Скрыть ответы" : "Показать ответы"}
            </button>
          )}
        </>
      )}

      {childComments.length > 0 &&
        showChild &&
        childComments.map((el) => {
          if (typeof el !== "number") {
            let elem = el as ICommentItem;
            return (
              <CommentBlock
                key={elem.id}
                comment={elem}
                addComment={addComment}
              />
            );
          }
        })}
    </div>
  );
};

export default CommentBlock;
