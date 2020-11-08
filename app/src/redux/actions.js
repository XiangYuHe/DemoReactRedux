function fetchOrdersSuccess(res) {
    return {
        type: 'FETCH_POSTS_SUCCESS',
        payload: res
    }
}

function filterByVendorName(vendorName) {
    return {
        type: 'FILTER_BY_VENDOR_NAME',
        payload: vendorName
    }
}

function filterByVendorNameAction(e) {
    return dispatch => {
        dispatch(
            filterByVendorName(e)
        );
    }
}


function fetchOrders() {
    return dispatch => {
        // Hard coding the URL here for retrieval of data
        fetch('https://chefhero.free.beeceptor.com/')
            .then(res => res.json())
            .then(res => {
                console.log(res); // Data is here
               dispatch(fetchOrdersSuccess(res.data));
            });
    }
}

export {fetchOrders, filterByVendorNameAction};


