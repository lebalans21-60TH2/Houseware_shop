import React, {Component} from "react";
import {connect} from "react-redux";
import {getBrands, getTypes, getAllProducts} from "../../actions/products";
import CollapseCheckbox from "../../utils/Checkbox";
import CollapseRadio from "../../utils/Radio";
import {capacity, price} from "../../utils/data";
import NewProducts from "./newProducts";
import Content from "./content";
import "./container.css";

class Container extends Component {
    state = {
        grid: "",
        limit: 9,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    };

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getTypes());
        this.props.dispatch(
            getAllProducts(this.state.skip, this.state.limit, this.state.filters)
        );
    }
    handlePrices = filters => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(filters, 10)) {
                array = data[key].array; //  array of data price
            }
        }
        return array;
    };
    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;
        if (category === "price") {
            let valuesPrice = this.handlePrices(filters);
            newFilters[category] = valuesPrice;
        }
        this.showFilteredResults(newFilters);
        this.setState({filters: newFilters});
    };
    showFilteredResults = filters => {
        this.props.dispatch(getAllProducts(0, this.state.limit, filters));
        this.setState({skip: 0});
    };
    loadMoreProducts = () => {
        let skip = this.state.skip + this.state.limit;
        this.props.dispatch(
            getAllProducts(
                skip,
                this.state.limit,
                this.state.filters,
                this.props.products.allProducts
            )
        );
        this.setState({skip, loading: true});
    };
    
    render() {
        const {products} = this.props;
        return (
            <div className="container">
                <div className="col-md-4 products-left">
                    {/* Brands */}
                    <CollapseCheckbox
                        index="1"
                        header="BRANDS"
                        lists={products.brands}
                        filters={filters => this.handleFilters(filters, "brand")}
                    />
                    {/* Capacity */}
                    <CollapseCheckbox
                        index="2"
                        header="Engine Capacity"
                        lists={capacity}
                        filters={filters => this.handleFilters(filters, "frets")}
                    />
                    {/* Types */}
                    <CollapseCheckbox
                        index="3"
                        header="Types"
                        lists={products.types}
                        filters={filters => this.handleFilters(filters, "wood")}
                    />
                    {/* Price */}
                    <CollapseRadio
                        index="3"
                        header="Price"
                        lists={price}
                        filters={filters => this.handleFilters(filters, "price")}
                    />
                    <div
                        className="new-products animated wow slideInUp"
                        data-wow-delay=".5s"
                    >
                        <h3>New Products</h3>
                        <NewProducts
                            products={products}
                            addToCart0={this.props.addToCart0}
                            addToCart={this.props.addToCart}
                        />
                    </div>
                    <div
                        className="men-position animated wow slideInUp"
                        data-wow-delay=".5s"
                    >
                        <a href="single.html">
                            <img src="images/27.jpg" alt=" " className="img-responsive"/>
                        </a>
                        <div className="men-position-pos">
                            <h4>Summer collection</h4>
                            <h5>
                                <span>55%</span> Flat Discount
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 products-right">
                    {/* <div className="products-right-grid">
                <div
                  className="products-right-grids-position animated wow slideInRight"
                  data-wow-delay=".5s"
                >
                  <img src="images/18.jpg" alt=" " className="img-responsive" />
                  <div className="products-right-grids-position1">
                    <h4>2016 New Collection</h4>
                    <p>
                      Temporibus autem quibusdam et aut officiis debitis aut
                      rerum necessitatibus saepe eveniet ut et voluptates
                      repudiandae sint et molestiae non recusandae.
                    </p>
                  </div>
                </div>
              </div> */}
                    <Content
                        addToCart0={this.props.addToCart0}
                        addToCart={this.props.addToCart}
                        limit={this.state.limit}
                        loadMoreProducts={this.loadMoreProducts}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    };
};
export default connect(mapStateToProps)(Container);
