import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfiguration";
import { useState } from "react";

function PostCard({ data, user, onPostUpdate }) {
    const [editingPost, setEditingPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedBody, setEditedBody] = useState("");

    const handleDelete = async (postId) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
            await deleteDoc(doc(db, "posts", postId));
            onPostUpdate();
        }
    };

    const handleEdit = async (postId) => {
        await updateDoc(doc(db, "posts", postId), {
            postTitle: editedTitle,
            postBody: editedBody,
        });
        setEditingPost(null);
        onPostUpdate();
    };

    return (
        <>
            {data.map((post) => (
                <div
                    key={post.id}
                    className="border border-gray-800 rounded-lg bg-white shadow p-4 space-y-2 mb-4"
                >
                    <p className="text-sm text-gray-200">
                        Publicado por: <span className="font-medium">{post.postUser}</span> •{" "}
                        {post.created}
                    </p>
                    {editingPost === post.id ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full mb-2 text-black"
                                placeholder="Editar título"
                            />
                            <textarea
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full mb-2 text-black"
                                placeholder="Editar contenido"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(post.id)}
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setEditingPost(null)}
                                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h4 className="text-lg font-bold text-green-400">{post.postTitle}</h4>
                            <p className="text-gray-300">{post.postBody}</p>
                            {post.postUser === user && (
                                <div className="flex gap-4 mt-2">
                                    <button
                                        onClick={() => {
                                            setEditingPost(post.id);
                                            setEditedTitle(post.postTitle);
                                            setEditedBody(post.postBody);
                                        }}
                                        className="px-4 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default PostCard;