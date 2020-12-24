import React from 'react'
import { useQuery } from '@apollo/client';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { GET_INVESTORS_BY_COMPANY } from './constants'
import Loader from '../../helpers/loader'

const InvestorsList = (props) =>{
    const { id , onEdit, onDelete } = props
    const { loading, error, data } = useQuery(GET_INVESTORS_BY_COMPANY, {
        variables: { company_id: id },
        fetchPolicy: "cache-and-network" 
      });
    if (loading) return  <Loader />;
    if (error) return <p>Error :(</p>;
    if (data?.investment?.length === 0) return <p>The database is empty!</p>
   

  

  return(
      <React.Fragment>
    <table className='investor-table table' >
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th className="action-right">Actions</th>
      </tr>
      </thead>
      <tbody>
      {
     
     data?.investment.map((item) => (

        <tr className="table-row" key={item.id}>
        <td>{item.investor.name}</td>
        <td>{item.amount}</td>
        <td className="action-right"> 
          <button className="transparent-btn mr-20" onClick={() => onEdit(item)}>
            <img src="/images/edit-icon.png" alt='edit' />
          </button>
          <button className="transparent-btn" onClick={() => onDelete(item)}>
          <img src="/images/delete-icon.png" alt='delete'/>
          </button>
        </td>
      </tr>
      ))
      }
      </tbody>
    </table></React.Fragment>

  )
  
  
  
}
InvestorsList.propTypes = {
  id:  PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
export default withRouter(InvestorsList);