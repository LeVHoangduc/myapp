import React, { useState } from 'react';
import API from '../API/API';
import { useNavigate } from 'react-router';
function BlogComment(props) {
    const [getComment, setComment] = useState("");
    const [getCommentError, setCommentError] = useState("");
    const getUser = JSON.parse(localStorage.getItem('user'));
    const getUserName = getUser ? getUser.name : 'Anonymous';
    const navigate = useNavigate();
    let url = '/blog/comment/' + props.idBlog;
    let accessToken = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    function handleChangeCommentInput(e) {
        const valueInput = e.target.value;
        setComment(valueInput);
    }
    function handleCommentSubmit(e) {
        e.preventDefault();
        if (getComment === '') {
            setCommentError('Please enter your comment!');
        } else {
            setCommentError('');
        }
        if (getUser) {
            const formData = new FormData();
            formData.append('id_blog', props.idBlog);
            formData.append('id_user', getUser.id);
            formData.append('id_comment', props.idSubComment ? props.idSubComment : 0);
            formData.append('comment', getComment);
            formData.append('image_user', getUser.avatar);
            formData.append('name_user', getUser.name);
            API.post(url, formData, config)
                .then(res => {
                    if (res.data.status === 200) {
                        setComment('');
                        console.log(res.data.data);
                        props.getCMT(res.data.data);
                    }
                }).catch(err => console.log(err));
        } else {
            alert('Please login to comment!');
            navigate('/login');
        }
    }
    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                    <h2>Leave a replay</h2>
                    <form className="text-area" method="post" onSubmit={handleCommentSubmit}>
                        <div className="blank-arrow">
                            <label>{getUserName}</label>
                        </div>
                        <span>*</span>
                        <textarea name="message" rows="11" value={getComment} onChange={handleChangeCommentInput}></textarea>
                        <button type="submit" className="btn btn-primary" to="">Post comment</button>
                    </form>
                    <h5 style={{ color: "red" }}>{getCommentError}</h5>
                </div>
            </div>
        </div>
    )
}
export default BlogComment;
