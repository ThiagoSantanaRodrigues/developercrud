import React from 'react';
import NumberFormat from 'react-number-format';

function DateMask(props) {
    const {inputRef,...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            format="##/##/####"  
        />
    )
}

export default DateMask;