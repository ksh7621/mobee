import Switch from "react-switch";
import React, {Component, useEffect, useState} from 'react';
import Search from "./search";
import SearchDirector from "./searchDirector";
import {useHistory} from "react-router-dom";


function Switching(props) {
    let history = useHistory();
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(!checked);

        if (checked == true) { //dir로
            console.log(checked);
            return history.push('/search/searchDirector')

        } else if (checked == false) { //search로
            console.log(checked);
            return history.push('/search')

        }

    }
    return (
        // <div className="example">
        //   <label htmlFor="material-switch">
        <Switch
            checked={props.checked}
            onChange={handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
        />
        //   </label>
        // </div>
    )

}

export default Switching;