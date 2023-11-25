import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../API/API";
import BlogComment from "./Comment";
import ListComment from "./ListComment";
import HalfRating from "./RatingReadOnly";
import BasicRating from "./Rate";
function Detail(props) {
    let params = useParams();
    const [getData, setData] = useState("");
    const [getComment, setComment] = useState([]);
    const [getIdReply, setIdReply] = useState('');
    useEffect(() => {
        API.get('blog/detail/' + params.id)
            .then(res => {
                setData(res.data.data);
                setComment(res.data.data.comment);
            })
            .catch(err => {
                console.log(err);
            })
    }, [params.id]);
    function fetchData() {
        if (Object.keys(getData).length > 0) {
            return (
                <div className="single-blog-post">
                    <h3>{getData.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user"></i>{getData.id_auth}</li>
                            <li><i className="fa fa-clock-o"></i>{getData.created_at}</li>
                            <li><i className="fa fa-calendar"></i>{getData.updated_at}</li>
                            <li><i className="fa fa-flag-checkered"></i><HalfRating idBlog={params.id} /></li>
                        </ul>
                    </div>
                    <Link to="">
                        <img src={require('./images/blog-one.jpg')} alt="" />
                    </Link>
                    <b>{getData.description}</b>
                    {htmlContent}
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><Link to="#">Pre</Link></li>
                            <li><Link to="#">Next</Link></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
    const createMarkup = (html) => {
        return { __html: html };
    }
    const htmlContent = (
        <div dangerouslySetInnerHTML={createMarkup(getData.content)} />
    );
    function handleReplyComment(e) {
        setIdReply(e.target.id);
        document.querySelector('.text-area textarea').focus();
    }
    function getCMT(data) {
        let listComment = [...getComment]
        if (data) {
            listComment.push(data);
            setComment(listComment);
        }
        return <ListComment dataComment={getComment} handleReplyComment={handleReplyComment} />
    }
    return (
        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
            </div>
            <div className="socials-share">
                <Link to=""><img src={require('./images/socials.png')} alt="" /></Link>
            </div>
            <BasicRating idBlog={params.id} />
            <div className="media commnets">
                <Link className="pull-left" to="#">
                    <img className="media-object" src={require('./images/man-one.jpg')} alt="" />
                </Link>
                <div className="media-body">
                    <h4 className="media-heading">Annie Davis</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="blog-socials">
                        <ul>
                            <li><Link to=""><i className="fa fa-facebook"></i></Link></li>
                            <li><Link to=""><i className="fa fa-twitter"></i></Link></li>
                            <li><Link to=""><i className="fa fa-dribbble"></i></Link></li>
                            <li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
                        </ul>
                        <Link className="btn btn-primary" to="">Other Posts</Link>
                    </div>
                </div>
            </div>
            {getCMT()}
            <BlogComment idBlog={params.id} idSubComment={getIdReply} getCMT={getCMT} />
        </div>
    )
}
export default Detail;