import React, { useState, forwardRef, useImperativeHandle } from "react";

const Toggleable = forwardRef((props, ref) => {
    const [visable, setVisable] = useState(true);
   

    const hideWhenVisible = { display: visable ? '': 'none' }
    const showWhenVisible = { display: visable ? 'none': '' }

    const toggleVisibility = () => {
        setVisable(!visable)
    }

    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>

        </div>
    )
})

export default Toggleable