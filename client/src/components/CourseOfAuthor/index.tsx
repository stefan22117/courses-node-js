import React from 'react'
import { TCourse } from '../../pages/Course'



const CourseOfAuthor :React.FC<{course: TCourse}> = ({course}) :JSX.Element => {
    return (
        <div>
            <h1>{course?.title}</h1>
            neciji kurs
        </div>
    )
}

export default CourseOfAuthor