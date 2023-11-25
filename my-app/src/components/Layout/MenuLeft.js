import React from "react";
import { Link } from "react-router-dom";
function MenuLeft() {
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Sportswear
                                </a>
                            </h4>
                        </div>
                        <div id="sportswear" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    <li><Link to="#">Nike </Link></li>
                                    <li><Link to="#">Under Armour </Link></li>
                                    <li><Link to="#">Adidas </Link></li>
                                    <li><Link to="#">Puma</Link></li>
                                    <li><Link to="#">ASICS </Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Mens
                                </a>
                            </h4>
                        </div>
                        <div id="mens" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    <li><Link to="#">Fendi</Link></li>
                                    <li><Link to="#">Guess</Link></li>
                                    <li><Link to="#">Valentino</Link></li>
                                    <li><Link to="#">Dior</Link></li>
                                    <li><Link to="#">Versace</Link></li>
                                    <li><Link to="#">Armani</Link></li>
                                    <li><Link to="#">Prada</Link></li>
                                    <li><Link to="#">Dolce and Gabbana</Link></li>
                                    <li><Link to="#">Chanel</Link></li>
                                    <li><Link to="#">Gucci</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    Womens
                                </a>
                            </h4>
                        </div>
                        <div id="womens" className="panel-collapse collapse">
                            <div className="panel-body">
                                <ul>
                                    <li><Link to="#">Fendi</Link></li>
                                    <li><Link to="#">Guess</Link></li>
                                    <li><Link to="#">Valentino</Link></li>
                                    <li><Link to="#">Dior</Link></li>
                                    <li><Link to="#">Versace</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Kids</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Fashion</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Households</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Interiors</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Clothing</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Bags</Link></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><Link to="#">Shoes</Link></h4>
                        </div>
                    </div>
                </div>

                <div className="brands_products">
                    <h2>Brands</h2>
                    <div className="brands-name">
                        <ul className="nav nav-pills nav-stacked">
                            <li><Link to="#"> <span className="pull-right">(50)</span>Acne</Link></li>
                            <li><Link to="#"> <span className="pull-right">(56)</span>Grüne Erde</Link></li>
                            <li><Link to="#"> <span className="pull-right">(27)</span>Albiro</Link></li>
                            <li><Link to="#"> <span className="pull-right">(32)</span>Ronhill</Link></li>
                            <li><Link to="#"> <span className="pull-right">(5)</span>Oddmolly</Link></li>
                            <li><Link to="#"> <span className="pull-right">(9)</span>Boudestijn</Link></li>
                            <li><Link to="#"> <span className="pull-right">(4)</span>Rösch creative culture</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="price-range">
                    <h2>Price Range</h2>
                    <div className="well text-center">
                        <input type="range" className="span2" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="sl2" /><br />
                        <b className="pull-left">$ 0</b> <b className="pull-right">$ 600</b>
                    </div>
                </div>

                <div className="shipping text-center">
                    <img src={require('./images/shipping.jpg')} alt="" />
                </div>

            </div>
        </div>
    )
}
export default MenuLeft;