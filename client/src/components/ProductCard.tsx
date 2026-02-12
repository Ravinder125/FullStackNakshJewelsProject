

export interface ProductCartProps {
    _id: string;
    name: string;
    image: string;
    price: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ProductCard = ({
    _id,
    image,
    price,
    name,
    onClick }: ProductCartProps) => {
    return (
        <div key={_id} className="card">
            <h3> {name}</h3>
            <p>₹{price}</p>
            {image ?
                (
                    <img src={image} alt="" />
                )
                : null}
            <button onClick={onClick}>
                Add to Cart
            </button>
        </div>
    )
}

export default ProductCard