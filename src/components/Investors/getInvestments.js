import React from 'react'
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { GET_INVESTMENTS_BY_INVESTOR } from './constants'
const Investments = (props) =>{
    const { id } = props
  const { loading, error, data } = useQuery(GET_INVESTMENTS_BY_INVESTOR, {
    variables: { investor_id: id }
  });

  if (loading) return <p>Loading...</p>;
if (error) return <p>error</p>;
  if (data.investment.length === 0) return <p>The database is empty!</p>

  return data.investment.map((item) => (
         item?.company?.name)).join(', ');
}
Investments.propTypes = {
  id:  PropTypes.number,
};
export default Investments;