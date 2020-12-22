import React , { useState ,useRef }from 'react'
import { withRouter } from "react-router";
import CompaniesList from './list'
import Pagination from "react-js-pagination";
// import { useQuery, gql } from '@apollo/client';


// const GET_INVESTORS = gql`
//   query GetInvestors {
//       investor {
//           id
//       }
//   }
// `;

const Companies = (props) =>{
  const [activePage, setActivePage ] = useState(1)
  const [searchFilter, setSearchFilter ] = useState('')

  const [offset, setOffset ] = useState(0);
  const search_filter = useRef();

  const limit = 10;
  //const {loading, data } = useQuery(GET_INVESTORS);


 
  const handlePageChange = ( page) => {
    setActivePage(page)
    const offest = page === '1' ? 0 : parseInt((page-1)+"1")
    setOffset(offest)
  }
  const handleFilter = (event) => {
    setSearchFilter(search_filter.current.value)
  }
  return(
    <div >
        <input type='text' ref={search_filter} name='searchFilter'  />
        <button onClick={handleFilter} >search</button>
        <CompaniesList limit={ limit } offset={ offset } searchFilter={searchFilter}  />
        {
          searchFilter !=='' ? null : <Pagination
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={400}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          /> 
        }
    </div>

  )
  
  
  
}
Companies.propTypes = {

};
export default withRouter(Companies);