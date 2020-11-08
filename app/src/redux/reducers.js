const initialState = {
    orders: [],
    vendorNames: [],
}

export function orders (state = initialState , action) {
    switch(action.type) {
        case 'FILTER_BY_VENDOR_NAME':
            let newState = Object.assign({}, state);
            let value = action.payload;
            let filteredValues = state.orders.filter(good => {
                return good.vendorName.trim() == value.trim(); // The data has some white spacing issues
            });

            if(value) {
                newState.filteredOrders = filteredValues;
            } else {
                newState.filteredOrders = state.orders; // Use the original goods if no value passed for filter
            }

            return newState;

        case 'FETCH_POSTS_SUCCESS':
            const vendorNames = action.payload.map(data => {
                return {
                    vendorName: data.vendorName
                }
            });
            return {
                ...state,
                // Here we need to fix it up a bit
                orders: action.payload.map(data => {
                    return {
                        id: data.id,
                        orderBuyerStatus: data.orderBuyerStatus,
                        deliveryDay: data.deliveryDay,
                        vendorName: data.vendorName,
                        isPendingVendorOnboarding: data.isPendingVendorOnboarding,
                        isBYOS: data.isBYOS,
                        total: data.total
                    }
                }),
                vendorNames: [...new Set(vendorNames.map(data => data.vendorName))],
            }
        default:
            return state
    }
}

export const getOrders = state => state.orders;
export const getAllVendorName = state => state.vendorNames;
export const getFilteredOrders = state => state.filteredOrders;