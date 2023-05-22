import React from "react";
import PropTypes from 'prop-types';

import { relateDateToToday } from "../../utils/date-utils";


export function RelatedTime({ time }) {
  const related = React.useMemo(() => {

    const relatedDate = relateDateToToday(time)
    const relatedTime = new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: "numeric", hour12: false, timeZone: "Europe/Moscow", timeZoneName: "short" }).format(Date.parse(time));

    return `${relatedDate},  ${relatedTime}`
  }, [time])


  return (
    <p className="text text_type_main-default text_color_inactive">{related}</p>
  )
}

RelatedTime.propTypes = {
  time: PropTypes.string.isRequired,
}
