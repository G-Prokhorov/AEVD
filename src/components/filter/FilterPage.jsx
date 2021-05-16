import React, {useEffect} from "react";
/*import {Select, InputLabel, MenuItem} from '@material-ui/core';*/

import photo from "../../img/d883f356f66173c404b5998ff70ea94a.jpg";
import Card from "./Card";
import "./style.css";

export default function FilterPage(props) {
    /*let [crop, setCrop] = useState([]);*/
    const [filter,setFilter] = props.filter;
    /*const [size, setSize] = props.size;*/

    function Continue() {
        props.setPage("download");
    }

    function chooseFilter(event) {
        setFilter(event.currentTarget.id);
    }

  /*  const handleChange = (event) => {
        setSize(event.target.value);
    };*/

    /*useEffect(() => {
        //req to back
        setCrop(["1:1", "9:16"]);
    }, []);*/

    useEffect(() => {
        const elmts = document.querySelector(".filterList");
        for (let elm of elmts.childNodes) {
            if (elm.id === filter) {
                elm.classList.add("shadowCard")
            } else {
                elm.classList.remove("shadowCard")
            }
        }
    }, [filter])


    return <div className="filterPage container">
        <div className="filterList">
            {["original", "b&w"].map((elmt, key) => {
                return <Card key={key} onClick={chooseFilter} photo={photo} text={elmt}/>
            })}
        </div>
        {/*<div className="listCrop">
            <InputLabel id="demo-simple-select-filled-label" className="label">Size: </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                className="select"
                value={size}
                onChange={handleChange}
            >
                {crop.map(elmt => <MenuItem value={elmt}>{elmt}</MenuItem>)}
            </Select>

        </div>*/}
        <div className="filterContinue">
            <button onClick={Continue} className="submitBth border animation1" disabled={!filter}>Upload
            </button>
            <p style={{opacity: filter ? 0 : 1}} className="alert">Select filter and size</p>
        </div>
    </div>
}