import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../API/API";
import HalfRating from "./RatingReadOnly";
function Blog() {
	const [getItems, setItems] = useState('');
	useEffect(() => {
		API.get('blog')
			.then(res => {
				setItems(res.data.blog);
			})
			.catch(err => {
				console.log(err);
			})
	}, []);
	function fetchData() {
		if (Object.keys(getItems).length > 0) {
			return getItems.data.map((value, key) => {
				return (
					<div className="single-blog-post" key={key}>
						<h3>{value.title}</h3>
						<div className="post-meta">
							<ul>
								<li><i className="fa fa-user"></i> {value.id_auth}</li>
								<li><i className="fa fa-clock-o"></i> {value.created_at}</li>
								<li><i className="fa fa-calendar"></i> {value.updated_at}</li>
							</ul>
							<span>
								<HalfRating idBlog={value.id} />
							</span>
						</div>
						<Link to="">
							<img src={require('./images/blog-one.jpg')} alt="" />
						</Link>
						<p>{value.description}</p>
						<Link className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
					</div>
				)
			})
		}
	}
	return (
		<div className="col-sm-9">
			<div className="blog-post-area">
				<h2 className="title text-center">Latest From our Blog</h2>
				{fetchData()}
				<div className="pagination-area">
					<ul className="pagination">
						<li><Link to="" className="active">1</Link></li>
						<li><Link to="">2</Link></li>
						<li><Link to="">3</Link></li>
						<li><Link to=""><i className="fa fa-angle-double-right"></i></Link></li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Blog;