import React, { useEffect } from 'react';
function CartScreen(props){
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]);

    useEffect(() =>{
        if(productId){
            dispatchEvent(addToCart(rpoductId, qty));
        }
    }, [])

    return <div>
        Cart Screen
    </div>
}

export default CartScreen;