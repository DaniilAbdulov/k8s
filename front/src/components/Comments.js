function Comments({comments}) {
  return comments?.length ? comments.map(({id, email, body}) => {

    return (
      <div className="comment" key={id}>
        <p className="comment-name">
          {email}
        </p>
        
        <div className="comment-body">
            <p>{body}</p>
        </div>
    </div>
  )
  }) : null;
}

export default Comments;
