import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className="mx-auto max-w-[1200px]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;