import axios from "axios";
import * as Types from "../constants/ActionTypes";
import * as urlApi from "../utils/urlApi";

// // Way 1
// export const loginUser = dataToSubmit => dispatch => {
//     axios.post(`${urlApi.USER_SERVER}/login`, dataToSubmit).then(res =>
//         dispatch({
//             type: Types.LOGIN_USER,
//             payload: res.data
//         })
//     );
// };

// Way 3
// export const loginUser = dataToSubmit => {
//     return {
//         type: Types.LOGIN_USER,
//         payload: dataToSubmit
//     };
// };
// export const callLoginUser = dataToSubmit => {
//     return dispatch => {
//         return axios.post(`${urlApi.USER_SERVER}/login`, dataToSubmit).then(res => {
//             dispatch(loginUser(res.data));
//         });
//     };
// };

// Way 2
export const loginUser = dataToSubmit => {
    console.log(12);
    const request = axios
        .post(`${urlApi.USER_SERVER}/login`, dataToSubmit)
        .then(res => res.data);
    return {
        type: Types.LOGIN_USER,
        payload: request
    };
};

export const getHistoryPurchase = dataToSubmit => {
    const request = axios.get("/api/payments/getall").then(res => res.data);
    return {
        type: Types.GET_PAYMENTS,
        payload: request
    };
};
// Register
export const registerUser = dataToSubmit => {
    const request = axios
        .post(`${urlApi.USER_SERVER}/register`, dataToSubmit)
        .then(res => res.data);
    return {
        type: Types.REGISTER_USER,
        payload: request
    };
};

export const auth = () => {
    const request = axios.get(`${urlApi.USER_SERVER}/auth`).then(res => res.data);
    return {
        type: Types.AUTH_USER,
        payload: request
    };
};

// Update Profile User
export const updateUserData = dataToSubmit => {
    const request = axios
        .post(`${urlApi.USER_SERVER}/update_profile`, dataToSubmit)
        .then(response => {
            return response.data;
        });
    return {
        type: Types.UPDATE_DATA_USER,
        payload: request
    };
};

//Log out
export const Logout = () => {
    const request = axios
        .get(`${urlApi.USER_SERVER}/logout`)
        .then(res => res.data);
    return {
        type: Types.LOGOUT_USER,
        payload: request
    };
};

export function addToCart(_id, quantity) {
    const request = axios
        .post(`${urlApi.USER_SERVER}/addToCart?productId=${_id}`, quantity)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantityCart = item.quantity;
                    }
                });
            });
            return response.data;
        });

    return {
        type: Types.ADD_TO_CART_USER,
        payload: request
    };
}

export const updateCartIn = (_id, key) => {
    const request = axios
        .post(`${urlApi.USER_SERVER}/updateCart?productId=${_id}`, key)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantityCart = item.quantity;
                    }
                });
            });
            return response.data;
        });

    return {
        type: Types.UPDATE_CART_IN,
        payload: request
    };
};

export const updateCartDe = _id => {
    const request = axios
        .post(`${urlApi.USER_SERVER}/updateCart?productId=${_id}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantityCart = item.quantity;
                    }
                });
            });
            return response.data;
        });

    return {
        type: Types.UPDATE_CART_DE,
        payload: request
    };
};
export const onSuccessBuy = data => {
    const request = axios
        .post(`${urlApi.USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: Types.PAYMENT,
        payload: request
    };
};
export const getCart = (cartItems, userCart) => {
    const request = axios
        .get(`${urlApi.PRODUCT_SEVRER}/articles_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(item => {
                response.data.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data[i].quantityCart = item.quantity;
                    }
                });
            });
            return response.data;
        });

    return {
        type: Types.GET_CART,
        payload: request
    };
};
export const deleteCart = id => {
    const request = axios
        .get(`${urlApi.USER_SERVER}/removeFromCart?_id=${id}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantityCart = item.quantity;
                    }
                });
            });
            return response.data;
        });
    return {
        type: Types.DELETE_CART,
        payload: request
    };
};
export const deleteOrder = id => {
    const request = axios.get(`/api/payment/delete/${id}`).then(res => res.data);
    return {
        type: Types.DELETE_PAYMENT,
        payload: id,
    };
};
