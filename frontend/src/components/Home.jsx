import { useEffect, useState } from 'react';
import CoffeeCard from './CoffeeCard';

const Home = () => {
    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/coffee')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCoffees(data);
            })
            .catch(err => console.error('Failed to load coffees', err));
    }, []);

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-6">All Coffees ({coffees.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coffees.map(coffee => (
                    coffee && (
                        <CoffeeCard
                            key={coffee._id}
                            coffee={coffee}
                            coffees={coffees}
                            setCoffees={setCoffees}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default Home;
