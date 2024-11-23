function PostCard(props) {
    return(
        <>
        {props.data.map((post) => (
            <div
                key={post.id}
                className="border border-gray-800 rounded-lg bg-white shadow p-4 space-y-2 mb-4"
            >
                <p className="text-sm text-gray-200">
                    Publicado por: <span className="font-medium">{post.postUser}</span> •{" "}
                    {post.created}
                </p>
                <h4 className="text-lg font-bold text-green-400">{post.postTitle}</h4>
                <p className="text-gray-300">{post.postBody}</p>
            </div>
        ))}
    </>
    )
}

export default PostCard;