import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const CoffeeCard = ({ coffee, coffees, setCoffees }) => {

    const { _id, name, quantity, supplier, taste, photo } = coffee;

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`http://localhost:5000/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            )
                            const remaining = coffees.filter(cof => cof._id !== _id);
                            setCoffees(remaining);
                        }
                    })

            }
        })
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl flex flex-col">
            <figure>
                <img src={photo} alt="Movie" className="" /></figure>
            <div className="flex justify-between w-full pr-4 flex-col">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="card-title mt-3">{name}</h2>
                    <p>{quantity}</p>
                    <p>{supplier}</p>
                    <p>{taste}</p>
                </div>
                <div className="card-actions mt-4 flex justify-center">
                    <div className="btn-group btn-group-vertical space-y-4 flex gap-1 justify-end">
                        <Link className="flex" to={`/coffee/${_id}`}>
                            <button className="btn bg-orange-400">View</button>
                        </Link>
                        <Link className="flex" to={`updateCoffee/${_id}`}>
                            <button className="btn bg-blue-600">Edit</button>
                        </Link>

                        <button
                            onClick={() => handleDelete(_id)}
                            className="btn bg-red-500 flex">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;