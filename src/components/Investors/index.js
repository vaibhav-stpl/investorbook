import React , { useState}from 'react'
import { withRouter } from "react-router";
import InvestorsList from './list'
import Pagination from "react-js-pagination";
// import { useQuery, gql } from '@apollo/client';


// const GET_INVESTORS = gql`
//   query GetInvestors {
//       investor {
//           id
//       }
//   }
// `;

const Investors = (props) =>{
  const [activePage, setActivePage ] = useState(1)
  const [offset, setOffset ] = useState(0);
  const limit = 10;
  //const {loading, data } = useQuery(GET_INVESTORS);


 
  const handlePageChange = ( page) => {
    setActivePage(page)
    const offest = page === '1' ? 0 : parseInt((page-1)+"1")
    setOffset(offest)
  }
  return(
    <div >
        <InvestorsList limit={ limit } offset={ offset } />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={400}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        /> 
    </div>

  )
  
  
  
}
Investors.propTypes = {

};
export default withRouter(Investors);