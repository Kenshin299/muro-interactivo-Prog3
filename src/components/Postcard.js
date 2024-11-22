function PostCard(props) {
    return(
    <>
        {
            props.data.map((posts) => (
                <div key={posts.id}>
                    <p className="userInfo">
                        Publicado por: {posts.postUser} • {posts.created}
                    </p>
                    <h4>{posts.postTitle}</h4>
                    <p className="Post-Text">
                        {posts.postBody}
                    </p>
                </div>
            ))
        }
    </>
    )
}

export default PostCard;