import { useCallback, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../app/store/hooks";
// import { fetchCart } from "../app/slices/cartSlice";
import type { CartItem } from "../types/cart";
import { getCartApi, quantityChangeApi } from "../services/cart.service";
import image from '../assets/qrCode.png'
import { Link } from "react-router-dom";


const Cart = () => {
    // const dispatch = useAppDispatch();
    // const { items, loading } = useAppSelector((state) => state.cart);

    const [items, setItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    // const [quantity, setQuantity] = useState<number>(0)

    const onIncrement = async (id: string) => {
        const item = items.find((i) => i.product._id === id)
        const quantity = item!.quantity + 1

        await onQuantityChange(id, quantity)
    }
    const onDecrement = async (id: string) => {
        const item = items.find((i) => i.product._id === id)
        const quantity = item!.quantity - 1

        await onQuantityChange(id, quantity)
    }

    const fetchCart = async () => {
        try {
            setLoading(true)
            const res = await getCartApi()
            if (res.data?.items) {
                setItems(res.data.items)
            }
        } catch (error) {
            console.error("Error while fetching cart items", error)
        } finally {
            setLoading(false)
        }
    }

    const onQuantityChange = async (productId: string, quantity: number) => {
        try {
            const res = await quantityChangeApi(productId, quantity)
            setItems(res.data!.items)
        } catch (error) {
            console.error("Error while changing quantity", error)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])


    if (loading) {
        return <p>Loading cart...</p>;
    }

    return (
        <div className="cart container">
            <h1>Cart</h1>

            <div className="cart-list--header">
                <span>Product details</span>
                <span>Quantity</span>
                <span> Price</span>
                <span>Total</span>
            </div>
            <Link to="/">Products</Link>
            {items.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div className="cart-item--list">
                    {items.map((item) => (
                        <div key={item.product._id} className="cart-item">
                            <div className="cart-item--info">
                                <img src={image} alt="image" />
                                <h4>{item.product.name}</h4>
                            </div>
                            <div className="cart-item--inc_dec">
                                <button
                                    className="decrement-btn"
                                    onClick={() => onDecrement(item.product._id)}
                                >
                                    -
                                </button>

                                {item.quantity}

                                <button
                                    className="increment-btn"
                                    onClick={() => onIncrement(item.product._id)}
                                >
                                    +
                                </button>
                            </div>
                            <p>₹{item.product.price}</p>
                            <p>
                                ₹{item.product.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart