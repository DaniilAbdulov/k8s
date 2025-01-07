import Comments from "./Comments";

function Post({post, comments}) {
  const {
    title,
    body
  } = post || {};

  return (
      <div className="client-card">
        <p className="client-name">{title}</p>
        
        <div className="client-info">
            <p>{body}</p>
        </div>
        <Comments comments={comments}/>
    </div>
  );
}

export default Post;
