// components/homeComp/HomeComp.jsx
import React, { useState } from "react";
import "./homeComp.css";  
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import CreateMeal from "../create/CreateMeal.jsx"; 
import CreateEntry from "../create/CreateEntry.jsx"; 
import CreateRoutine from "../create/CreateRoutine.jsx"; 

const HomeComp = ({ image, name, description, view }) => {
    const [openPopup, setOpenPopup] = useState(false);

    const renderCreateComponent = () => {
        switch (name) {
            case "Meals":
                return <CreateMeal setOpen={setOpenPopup} />;
            case "Entries":
                return <CreateEntry setOpen={setOpenPopup} />;
            case "Routines":
                return <CreateRoutine setOpen={setOpenPopup} />;
            default:
                return null;
        }
    };

    return (
        <div className="homeCompContainer">
            <div className="imgCont">
                <img src={image} alt={name} />
            </div>
            <h2>{name}</h2>
            <p>{description}</p>
            <div className="buttons">
                <div className="createButton">
                    <button onClick={() => setOpenPopup(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <p>Add</p>
                </div>
                <div className="viewButton">
                    <Link to={view}>
                        <button>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                    </Link>
                    <p>View</p>
                </div>
            </div> 
            {openPopup && renderCreateComponent()}
        </div>
    );
};

export default HomeComp;
