import React, {Fragment} from 'react'
import PropTypes from 'prop-types';

const RainbowFrame = (props) => {

    let children = props.children;

    props.colors.forEach((v)=>{
        children = <div style={{border:"2px solid " + v}}>{children}</div>
    });

    return (
        <Fragment>
            {children}
        </Fragment>
    )
};

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string)
};

export default RainbowFrame;