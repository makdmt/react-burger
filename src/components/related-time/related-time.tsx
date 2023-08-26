import React, { FC } from "react";
import { relateDateToToday } from "../../utils/date-utils";


export const RelatedTime: FC<{ time: string }> = ({ time }) => {
  const related = React.useMemo(() => {

    const relatedDate: string = relateDateToToday(time)
    const relatedTime: string = new Intl.DateTimeFormat('ru-RU', { hour: 'numeric', minute: "numeric", hour12: false, timeZone: "Europe/Moscow", timeZoneName: "short" }).format(Date.parse(time));

    return `${relatedDate},  ${relatedTime}`
  }, [time])


  return (
    <p className="text text_type_main-default text_color_inactive">{related}</p>
  )
}
