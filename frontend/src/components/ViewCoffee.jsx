import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewCoffee = () => {
    const { id } = useParams();
    const [coffee, setCoffee] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/coffee/${id}`)
            .then(res => res.json())
            .then(data => setCoffee(data))
            .catch(err => console.error("Error loading coffee:", err));
    }, [id]);

    if (!coffee) {
        return <p className="text-center mt-10 text-lg">Loading coffee details...</p>;
    }

    const { name, quantity, supplier, taste, category, details, photo } = coffee;

    return (
        <div className="w-full p-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Coffee Details</h2>
            <div className="w-full card bg-base-100 shadow-xl p-6">
                <figure className="mb-4 w-full">
                    <img src={photo} alt={name} className="w-full cover rounded-lg" />
                </figure>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Name: {name}</h3>
                    <p><strong>Quantity:</strong> {quantity}</p>
                    <p><strong>Supplier:</strong> {supplier}</p>
                    <p><strong>Taste:</strong> {taste}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Details:</strong> {details}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewCoffee;
