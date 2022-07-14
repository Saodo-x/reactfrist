import React from "react";

function Header (props){
    const txtChange = props.onChange
    return (
        <div><input  type='text' name='valueList' onChange={txtChange}/></div>
    )
}

export default Header