import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useEffect } from 'react';
import API from '../API/API';
export default function HalfRating(props) {
    const [value, setValue] = React.useState(5);
    useEffect(() => {
        API.get('blog/rate/' + props.idBlog)
            .then(res => {
                caculateAverageRating(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props.idBlog]);

    function caculateAverageRating(data) {
        if (Object.keys(data).length > 0) {
            let sum = 0;
            Object.keys(data).forEach(function (key) {
                sum += data[key].rate;
            });
            setValue(sum / Object.keys(data).length);
        }
    }

    return (
        <Rating name="read-only" value={value} readOnly />
    );
}
