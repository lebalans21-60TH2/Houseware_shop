import axios from "axios";
import * as Types from "../constants/ActionTypes";
import * as urlApi from "../utils/urlApi";

export const productsBySell = () => dispatch => {
    axios
        .get(`${urlApi.PRODUCT_SEVRER}/articles?sortBy=sold&order=desc&limit=8`)
        .then(res =>
            dispatch({
                type: Types.GET_PRODUCTS_BY_SELL,
                payload: res.data
            })
        );
};
export const productsByArrival = () => dispatch => {
    axios
        .get(`${urlApi.PRODUCT_SEVRER}/articles?sortBy=createdAt&order=desc&limit=8`)
        .then(res =>
            dispatch({
                type: Types.GET_PRODUCTS_BY_ARRIVAL,
                payload: res.data
            })
        );
};
export const newProduct = () => dispatch => {
    axios
        .get(`${urlApi.PRODUCT_SEVRER}/articles?sortBy=createdAt&order=desc&limit=3`)
        .then(res =>
            dispatch({
                type: Types.GET_PRODUCTS_NEW,
                payload: res.data
            })
        );
};
export const searchProduct = textSearch => dispatch => {
    axios.get(`${urlApi.PRODUCT_SEVRER}/searchProduct/${textSearch}`).then(res =>
        dispatch({
            type: Types.SEARCH_PRODUCT,
            payload: res.data
        })
    );
};
export const getBrands = () => dispatch => {
    axios
        .get(`${urlApi.PRODUCT_SEVRER}/brands`)
        .then(res => dispatch({type: Types.GET_BRANDS, payload: res.data}));
};
export const getTypes = () => dispatch => {
    axios
        .get(`${urlApi.PRODUCT_SEVRER}/types`)
        .then(res => dispatch({type: Types.GET_TYPE, payload: res.data}));
};
export const getAllProducts = (
    skip,
    limit,
    filters = [],
    previousState = []
) => dispatch => {
    const data = {
        limit,
        skip,
        filters
    };
    axios.post(`${urlApi.PRODUCT_SEVRER}/shop`, data).then(res => {
        let newState = [...previousState, ...res.data.articles];
        dispatch({
            type: Types.GET_ALL_PRODUCTS,
            payload: {
                size: res.data.size,
                articles: newState
            }
        });
    });
};
export const deleteProduct = id => dispatch => {
    axios.get(`${urlApi.PRODUCT_SEVRER}/delete/${id}`).then(res =>
        dispatch({
            type: "DELETE",
            id
        })
    );
};
export const getProductDetail = id => {
    const request = axios
        .get(`${urlApi.PRODUCT_SEVRER}/articles_by_id?id=${id}&type=single`)
        .then(res => res.data[0]);
    return {
        type: Types.GET_PRODUCT_DETAIL,
        payload: request
    };
};

export function clearProductDetail() {
    return {
        type: Types.CLEAR_PRODUCT_DETAIL,
        payload: ""
    };
}
