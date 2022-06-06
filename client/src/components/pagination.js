import React from 'react'

const Pagination = ({ patientsPerPage, totalPatients, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPatients / patientsPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <nav>
            <ul>
                {pageNumbers.map(number => {
                    <li key ={number}>
                        <a onClick={() => paginate(number)} href="!#"></a>
                        {number}
                    </li>
                })}

            </ul>

        </nav>
    )
}

export default Pagination 