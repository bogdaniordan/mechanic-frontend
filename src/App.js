import logo from './logo.svg';
import {useState, useEffect} from 'react';
import './App.css';
import Main from "./components/main/Main";
import {DiscountContext} from "./components/contexts/DiscountContext"
import CarService from "./service/CarService";

function App() {
    // const [randomCar, setRandomCar] = useState();
    // const [isLoading, setIsLoading] = useState(true);
    //
    // useEffect(() => {
    //     CarService.getDiscountedCarBrand().then(r => setRandomCar(r.data));
    //     setIsLoading(false);
    // }, [])
    const randomCar = "Dacia";


    // if (!isLoading) {
        return (
            <div className="App">
                <DiscountContext.Provider value={{randomCar}}>
                    <Main />
                </DiscountContext.Provider>
            </div>
        );
    // } else {
    //     return (
    //         <h3>Loading...</h3>
    //     )
    // }

}

export default App;
