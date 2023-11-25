import React from 'react'
import { Link } from 'react-router-dom'
function ListComment(props) {
    let { dataComment } = props;
    const mainCommentData = dataComment.filter((value) => {
        return value.id_comment == 0;
    });
    const subCommentData = dataComment.filter((value) => {
        return value.id_comment != 0;
    });
    function fetchMainComment() {
        if (mainCommentData) {
            return mainCommentData.map((value, key) => {
                return (
                    <li className="media" key={key}>
                        <Link className="pull-left" to="#">
                            <img className="media-object" src={require('./images/man-two.jpg')} alt="" />
                        </Link>
                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user"></i>{value.name_user}</li>
                                <li><i className="fa fa-clock-o"></i>{value.created_at}</li>
                                <li><i className="fa fa-calendar"></i>{value.updated_at}</li>
                            </ul>
                            <p>{value.comment}.</p>
                            <Link className="btn btn-primary" to="" onClick={props.handleReplyComment} id={value.id}><i className="fa fa-reply"></i>Replay</Link>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="media-list">
                                    {fetchSubComment(value.id)}
                                </ul>
                            </div>
                        </div>
                    </li>
                )
            });
        }
    }
    function fetchSubComment(idComment) {
        if (subCommentData) {
            return subCommentData.map((value, key) => {
                if (value.id_comment == idComment) {
                    return (
                        <li className="media second-media" key={key}>
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>{value.name_user}</li>
                                    <li><i className="fa fa-clock-o"></i>{value.created_at}</li>
                                    <li><i className="fa fa-calendar"></i>{value.updated_at}</li>
                                </ul>
                                <p>{value.comment}.</p>
                            </div>
                        </li>
                    )
                }
                return null;
            });
        }
    }
    const quantityComment = () => {
        if (dataComment.length > 0) {
            return dataComment.length;
        }
    }
    return (
        <div className="response-area">
            <h2>{quantityComment()} RESPONSES</h2>
            <ul className="media-list">
                {fetchMainComment()}
            </ul>
        </div>
    )
}
export default ListComment;
