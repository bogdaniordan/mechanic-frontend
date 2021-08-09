import './App.css';
import Main from "./components/main/Main";
import {DiscountContext} from "./components/contexts/DiscountContext"

function App() {
    const randomCar = "Dacia";

        return (
            <div className="App">
                <DiscountContext.Provider value={{randomCar}}>
                    <Main />
                </DiscountContext.Provider>
            </div>
        );

}

export default App;
