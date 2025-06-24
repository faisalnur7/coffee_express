import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [coffee, setCoffee] = useState({});

    // Fetch existing coffee data
    useEffect(() => {
        fetch(`http://localhost:5000/coffee/${id}`)
            .then(res => res.json())
            .then(data => setCoffee(data))
            .catch(err => console.error("Error loading coffee:", err));
    }, [id]);

    const handleUpdateCoffee = (event) => {
        event.preventDefault();
        const form = event.target;

        const updatedCoffee = {
            name: form.name.value,
            quantity: form.quantity.value,
            supplier: form.supplier.value,
            taste: form.taste.value,
            category: form.category.value,
            details: form.details.value,
            photo: form.photo.value
        };

        fetch(`http://localhost:5000/coffee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Coffee Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Great!'
                    });
                    navigate('/'); // Navigate back to home after update
                }
            });
    };

    return (
        <div className="p-24">
            <h2 className="text-3xl font-extrabold">Update Coffee: {coffee.name}</h2>
            <form onSubmit={handleUpdateCoffee}>
                {/* name & quantity */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label"><span className="label-text">Coffee Name</span></label>
                        <input type="text" name="name" defaultValue={coffee.name} placeholder="Coffee Name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label"><span className="label-text">Available Quantity</span></label>
                        <input type="text" name="quantity" defaultValue={coffee.quantity} placeholder="Quantity" className="input input-bordered w-full" />
                    </div>
                </div>
                {/* supplier & taste */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label"><span className="label-text">Supplier</span></label>
                        <input type="text" name="supplier" defaultValue={coffee.supplier} placeholder="Supplier" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label"><span className="label-text">Taste</span></label>
                        <input type="text" name="taste" defaultValue={coffee.taste} placeholder="Taste" className="input input-bordered w-full" />
                    </div>
                </div>
                {/* category & details */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label"><span className="label-text">Category</span></label>
                        <input type="text" name="category" defaultValue={coffee.category} placeholder="Category" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label"><span className="label-text">Details</span></label>
                        <input type="text" name="details" defaultValue={coffee.details} placeholder="Details" className="input input-bordered w-full" />
                    </div>
                </div>
                {/* photo */}
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input type="text" name="photo" defaultValue={coffee.photo} placeholder="Photo URL" className="input input-bordered w-full" />
                    </div>
                </div>
                <input type="submit" value="Update Coffee" className="btn btn-block bg-green-600 text-white" />
            </form>
        </div>
    );
};

export default UpdateCoffee;
