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
        <div className="Post-Container">
                {!props.auth ? (
                    <div className="NewPost">
                        <h5>Para publicar un Post debe Iniciar Sesión</h5>
                    </div>
                ) : (
                    <div className="NewPost">
                        <h5>Titulo del Post</h5>
                        <form id="Form" onSubmit={addPost}>
                            <input 
                                type="text" 
                                id="NewPostTitle" 
                                placeholder="Titulo del Post" 
                                onChange={handleTitleChange} required
                            />
                            <textarea 
                                type="text" 
                                id="NewPostBody" 
                                placeholder="Crear Nuevo Post" 
                                onChange={handlePostChange} required>
                            </textarea>
                            <div className="NewPost-Buttons">
                                <input id="PublicarButton" type="submit" value="Publicar"/>
                            </div>
                            <div className="NewPost-Buttons">
                                <button id="ClearButton" onClick={handleReset} type="reset">Limpiar</button>
                            </div>
                        </form>
                    </div>
                )}
            <div className="hSeparator">
                <h5>Posts del Muro</h5>
            </div>
            <PostContainer isSent={isSent}/>
        </div>
    )
}

export default Posts;