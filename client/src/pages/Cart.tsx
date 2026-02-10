import { useEffect } from "react";
import { fetchCart } from "../app/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";

const Cart = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    if (loading) return <p>Loading cart...</p>;

    return (
        <div>
            <h1>Cart</h1>

            {items.length === 0 && <p>Cart is empty</p>}

            {items.map((item) => (
                <div key={item.product._id}>
                    <h4>{item.product.name}</h4>
                    <p>
                        ₹{item.product.price} × {item.quantity}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
