import PostCard from "./Postcard";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {db} from '../FirebaseConfiguration';
import { useEffect } from 'react';
import { useState } from 'react';

function PostContainer(props) {
    const [posts, setPosts]= useState([]);

    const fetchPost = async () => {
        await getDocs(query(collection(db, "posts"), orderBy("created", "desc")))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setPosts(newData);                
                console.log(newData);
            }
        )
    }

    useEffect(()=>{
        fetchPost();
    }, [props.isSent])

    return (
        <div className="PostList">
            <PostCard data={posts}/>
        </div>
    )
}

export default PostContainer;