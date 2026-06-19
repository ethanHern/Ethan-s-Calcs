import { Helmet } from "react-helmet-async";
import InputCell from "./components/InputCell";

export default function Calculator() {

    return (
        <div className="flex items-center justify-center">
            <Helmet>
                <title>Calculator | Ethan's Calcs</title>
            </Helmet>
            <InputCell/>
        </div>
    )
}