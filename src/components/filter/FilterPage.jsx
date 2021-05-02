import React, {useEffect, useState} from "react";
import {Select, InputLabel, MenuItem} from '@material-ui/core';

import photo from "../../img/d883f356f66173c404b5998ff70ea94a.jpg";
import Card from "./Card";
import "./style.css";

export default function FilterPage(props) {
    let [crop, setCrop] = useState([]);
    const [filter,setFilter] = useState('')
    const [age, setAge] = useState('');

    function Continue() {
        props.setPage("download");
    }

    function chooseFilter(event) {
        setFilter(event.currentTarget.id)
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        //req to back
        setCrop(["1:1", "9:16"])
    }, [])


    return <div className="filterPage container">
        <div className="filterList">
            {["original", "bw"].map((elmt) => {
                return <Card onClick={chooseFilter} photo={photo} text={elmt}/>
            })}
        </div>
        <div className="listCrop">
            <InputLabel id="demo-simple-select-filled-label" className="label">Size: </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                className="select"
                value={age}
                onChange={handleChange}
            >
                {crop.map(elmt => <MenuItem value={elmt}>{elmt}</MenuItem>)}
            </Select>

        </div>
        <div className="filterContinue">
            <button onClick={Continue} className="submitBth border animation1" disabled={!(age && filter)}>Continue
            </button>
            <p style={{opacity: age && filter ? 0 : 1}} className="alert">Select filter and size</p>
        </div>
    </div>
}