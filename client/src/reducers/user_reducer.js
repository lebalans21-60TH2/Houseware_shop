import * as Types from "../constants/ActionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case Types.LOGIN_USER:
            console.log(123213);
            return {...state, loginSuccess: action.payload, loginAdminSuccess: action.payload };
        case Types.REGISTER_USER:
            return {...state, register: action.payload};
        case Types.LOGOUT_USER:
            return {...state};
        case Types.ADD_TO_CART_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            };
        case Types.GET_CART:
            return {...state, cartDetail: action.payload};
        case Types.AUTH_USER:
            return {...state, userData: action.payload};
        case Types.DELETE_CART:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            };
        case Types.UPDATE_CART_IN:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            };
        case Types.PAYMENT:
            return {
                ...state,
                successBuy: action.payload.success,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                payment: action.payload.payment,
                cartDetail: action.payload.cartDetail
            };
        case Types.DELETE_PAYMENT:
            return {
                ...state,
                payments: state.payments.filter(
                    product => product._id !== action.payload
                )
            };
        case Types.UPDATE_DATA_USER:
            return {...state, updateUser: action.payload};
        case Types.UPDATE_CART_DE:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            };
        case Types.GET_PAYMENTS:
            return {
                ...state,
                payments: action.payload.filter(
                    item => item.user[0].id === state.userData.id
                )
            };
        default:
            return state;
    }
}
