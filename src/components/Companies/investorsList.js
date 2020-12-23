import React from 'react'
import { useQuery } from '@apollo/client';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { GET_INVESTORS_BY_COMPANY } from './constants'

const InvestorsList = (props) =>{
    const { id , onEdit, onDelete } = props
    const { loading, error, data } = useQuery(GET_INVESTORS_BY_COMPANY, {
        variables: { company_id: id }
      });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (data?.investment?.length === 0) return <p>The database is empty!</p>
    console.log(data)
    const totalAmount =data?.investment?.reduce(function(tot, arr) { 
      return tot + arr.amount;
    },0);

  

  return(
      <React.Fragment>
           <p>Total amount intersted {totalAmount}</p>
    <table className='investor-table table' >
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {
     
      data?.investment.map((item) => (

        <tr key={item.id}>
        <td>{item.investor.name}</td>
        <td>{item.amount}</td>
        <td> 
          <button onClick={() => onEdit(item)}>edit</button>
          <button onClick={() => onDelete(item)}>delete</button>
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
  onDelete: PropTypes.func,
};
export default withRouter(InvestorsList);