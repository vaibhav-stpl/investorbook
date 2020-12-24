import React from 'react'
import { useQuery } from '@apollo/client';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { GET_INVESTMENTS_BY_INVESTOR } from './constants'
import Loader from  '../../helpers/loader'
const InvestmentsList = (props) =>{
    const { id , onEdit, onDelete , deletedInvestments } = props
    const { loading, error, data } = useQuery(GET_INVESTMENTS_BY_INVESTOR, {
        variables: { investor_id: id }
      });
    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;
    if (data?.investment?.length === 0) return <p>The database is empty!</p>
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
        <th className="action-right">Action</th>
      </tr>
      </thead>
      <tbody>
      {
     
      data?.investment.filter((item)=> !deletedInvestments.includes(item.id)).map((item) => (

        <tr className="table-row" key={item.id}>
        <td>{item.company.name}</td>
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
InvestmentsList.propTypes = {
  id:  PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  deletedInvestments: PropTypes.array
};
export default withRouter(InvestmentsList);