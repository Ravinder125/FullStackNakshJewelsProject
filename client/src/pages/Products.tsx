import { useEffect, useState } from "react";
import { getProductsApi } from "../services/product.service";
import type { Product } from "../types/product";
import { useAppDispatch } from "../app/store/hooks";
import { addToCart } from "../app/slices/cartSlice";
import image from '../assets/qrCode.png'
import ProductCard from "../components/ProductCard";

const Products = () => {
    const dispatch = useAppDispatch();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await getProductsApi();
                setProducts(res.data!);
                // console.log(res)
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container" >
            <h1>Products</h1>

            {loading && <p>Loading products...</p>}

            {!loading && products?.length === 0 && <p>No products found</p>}

            {products?.map((product) => (
                <ProductCard
                    key={product._id}
                    _id={product._id}
                    price={product.price}
                    name={product.name}
                    image={image}
                    onClick={() => {
                        dispatch(addToCart(
                            { productId: product._id, quantity: 1 }))
                    }
                    }
                />
            ))}

            {/* Pagination */}
            {/* <div style={{ marginTop: "20px" }}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page} of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div> */}
        </div>
    );
};

export default Products;
