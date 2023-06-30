import React from 'react';
import moment from 'moment';

type Props = {
    date: string;
}

function DateComponent(props: Props) {
    const formattedDate = moment(props.date).format('MMMM Do, h:mm:ss a');

    return (
        <div>{formattedDate}</div>
    );
}

export default DateComponent;