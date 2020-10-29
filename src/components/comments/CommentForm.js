import React, { useContext, useState, useEffect } from "react"
import { CommentContext } from "./CommentProvider"

export const CommentForm = (props) => {

    const { addComment, updateComment, comments } = useContext(CommentContext)

    const [comment, setComment] = useState({})

    const editMode = props.match.params.hasOwnProperty("postId")
    console.log(props)

    const handleControlledInputChange = (eve) => {
        const newComment = Object.assign({}, comment)
        newComment[eve.target.name] = eve.target.value
        setComment(newComment)
    }

    const constructNewComment = () => {
        const post_id = parseInt(props.match.params.postId)
        if(comment.subject && comment.content){
            if(editMode) {
              updateComment({
                  id: comment.id,
                  subject: comment.subject,
                  content: comment.content,
                  post_id,
                  user_id: parseInt(localStorage.getItem("rare_user_id")),
                  timestamp: Date.now()
              }).then(() => {
                  props.history.push(`/comments/${post_id}`)
              })
            } else{
                const newCommentObject = {
                    subject: comment.subject,
                    content: comment.content,
                    post_id,
                    user_id: parseInt(localStorage.getItem("rare_user_id")),
                    timestamp: Date.now()
                }
                addComment(newCommentObject)
                    .then(props.history.push(`/comments/${post_id}`))
            }}else{
                window.alert("please fill in all fields")
            } 


    }
    return (

        <form className="form new_comment_form" id="commentForm">
            <h2 className="commentForm_title">{editMode ? "Update Comment" : "Create a New Comment"}</h2>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="subject">Subject: </label>
                    <input type="text" name="subject" required className="form-control" id="subject"
                        proptype="varchar"
                        placeholder={editMode ? comment.subject : "subject"}
                        defaultValue={comment.subject}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="content">Comment: </label>
                    <textarea type="text" name="content" required className="form-control" id="content"
                        proptype="varchar"
                        placeholder={editMode ? comment.content : "What are your thoughts?"}
                        defaultValue={comment.content}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewComment()
                        
                }}
                className="btn comment_submit_btn">
                {editMode ? "Save Edit" : "Save Comment"} 
            </button>
            <button 
                onClick={evt => {
                    props.history.push(`/posts/${parseInt(props.match.params.postId)}`)
                }}
                className="btn cancel_btn">
                Back To Post 
            </button>

        </form>
    )
}