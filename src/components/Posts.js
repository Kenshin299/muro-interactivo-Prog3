import PostContainer from "./PostContainer";
import React, {useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../FirebaseConfiguration';

function Posts(props) {
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody]= useState("");
    const [isSent, setIsSent] = useState(false);
    
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    let date = new Date().toLocaleDateString('es-ES', options);
    
    const handlePostChange = (e) => {
        setPostBody(e.target.value);
    };

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handleReset = (e) => {
        setPostTitle("");
        setPostBody("");
    }

    const addPost = async (e) => {
        e.preventDefault();
        const sendPost = await addDoc(collection(db, 'posts'), {
            postUser: props.user,
            created: date,
            postTitle: postTitle,
            postBody: postBody,
        })
       document.getElementById("Form").reset();
       setIsSent(prevCheck => !prevCheck);
    };
    
    return (
        <div className="flex flex-col items-center gap-6 p-6">
            {!props.auth ? (
                <div className="bg-blue-800 text-white text-center p-6 rounded-lg shadow-lg">
                    <h5 className="text-lg font-semibold">Para publicar un Post debe Iniciar Sesión</h5>
                </div>
            ) : (
                <div className="bg-blue-800 text-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <h5 className="text-lg font-semibold mb-4">Titulo del Post</h5>
                    <form id="Form" onSubmit={addPost} className="flex flex-col gap-4">
                        <input
                            type="text"
                            id="NewPostTitle"
                            placeholder="Titulo del Post"
                            onChange={handleTitleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                        <textarea
                            id="NewPostBody"
                            placeholder="Crear Nuevo Post"
                            onChange={handlePostChange}
                            required
                            className="p-3 border border-gray-300 rounded-md w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                        <div className="flex justify-end gap-4">
                            <input
                                id="PublicarButton"
                                type="submit"
                                value="Publicar"
                                className="px-6 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
                            />
                            <button
                                id="ClearButton"
                                onClick={handleReset}
                                type="reset"
                                className="px-6 py-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition transform hover:scale-105"
                            >
                                Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="border-t border-gray-300 w-full max-w-2xl pt-6">
                <h5 className="text-lg font-semibold text-gray-200">Posts del Muro</h5>
            </div>
            <PostContainer isSent={isSent} user={props.user}/>
        </div>
    )
}

export default Posts;