import * as React from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import API from '../API/API';
import Typography from '@mui/material/Typography';
export default function BasicRating(props) {
    const [rating, setRating] = React.useState(5);
    const getUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    let url = '/blog/rate/' + props.idBlog;
    let accessToken = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    function handleChangeRating(e) {
        if (getUser) {
            const valueInput = parseInt(e.target.value);
            setRating(valueInput);
        }
        else {
            alert('Please login to rate!');
            navigate('/login');
        }
    }
    function handleSubmitRating(e) {
        e.preventDefault();
        if (getUser) {
            const formData = new FormData();
            formData.append('blog_id', props.idBlog);
            formData.append('user_id', getUser.id);
            formData.append('rate', rating);
            API.post(url, formData, config)
                .then(res => {
                    if (res.data.status === 200) {
                        setRating(0);
                        alert("Your rating has been sent!");
                        window.location.reload();
                    }
                }
                ).catch(err => console.log(err));
        } else {
            alert('Please login to rate!');
            navigate('/login');
        }
    }
    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this"><Typography component="legend">Rate this item:</Typography></li>
                <li>
                    <form onSubmit={handleSubmitRating}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={handleChangeRating}
                    />
                    <button type="submit" className="btn btn-default pull-right">Rate</button>
                    </form>
                </li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><Link className="color" to="">Pink <span>/</span></Link></li>
                <li><Link className="color" to="">T-Shirt <span>/</span></Link></li>
                <li><Link className="color" to="">Girls</Link></li>
            </ul>
        </div>

    );
}
