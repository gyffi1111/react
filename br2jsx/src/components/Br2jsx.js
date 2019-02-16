import React, {Fragment} from 'react'
import PropTypes from 'prop-types';

const br2jsx = (props)=>{
    let string = props.text.split(/&lt;br ?\/>|&lt;br ?\/&rt;|<br ?\/>|<br ?>/g);

    string = string.map((v, k) => {
        return (
            <Fragment key={k}>
                {v}<br />
            </Fragment>
        )
    });

    return (
        <Fragment>
            {string}
        </Fragment>
    )
};

br2jsx.propTypes = {
    text: PropTypes.string.isRequired,
};

export default br2jsx