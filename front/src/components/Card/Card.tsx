import { IProduct } from "@/types/types";

const Card: React.FC <IProduct> = ({
    name, price, image
}) => {
    return (
        <div className="flex flex-col items-center justify-center my-10 bg-white rounded-xl py-10 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2>{name}</h2>
            <img src={image} alt="Imagen del producto" className="w-80 hover:-translate-y-1/50 transition-transform" />
            <p>${price}</p>
        </div>
    )
}

export default Card;