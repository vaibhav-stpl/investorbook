import React from 'react'
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { GET_INVESTORS_BY_COMPANY } from './constants'

const Investors = (props) =>{
    const { id } = props
  const { loading, error, data } = useQuery(GET_INVESTORS_BY_COMPANY, {
    variables: { company_id: id }
  });

  if (loading) return <p>Loading...</p>;
if (error) return <p>error</p>;
  if (data.investment.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return data.investment.map((item) => (
      <span key={ item.id }>
        { item?.investor.name },
      </span>
  ));
}
Investors.propTypes = {
  id:  PropTypes.string,
};
export default Investors;