import React , {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import Investors from './getInvestors'
import PropTypes from 'prop-types';
import { GET_COMPANIES , GET_FILTERS} from './constants'

const CompaniesList = (props) =>{
  const {offset, limit,searchFilter } = props
  const { loading, error, data } = useQuery(GET_COMPANIES,{ skip: searchFilter!=='' ,variables: {offset: offset, limit: limit}});
  const { loading: sloading, error: serror, data: sdata } = useQuery(GET_FILTERS,{skip: searchFilter==='',variables: {search: searchFilter}});
  const [companies, setCompanies ] = useState([])
  useEffect(() => {
    if (data) {
      setCompanies(data.comany || sdata)
    }
  },[data, sdata])


  if (loading || sloading) return <p>Loading...</p>;
  if (error || serror) return <p>Error :(</p>;
  if (companies.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return(
    <table >
      <tr>
        <th>Name</th>
        <th>Investors</th>
      </tr>
      {
      companies.map(({ id, name, photo_thumbnail }) => (

        <tr  key={id}>
        <td>{name}</td>
        <td><Investors id={ id }/></td>
      </tr>
      ))
      }
  
    </table>

  )
  
  
  
}
CompaniesList.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  searchFilter: PropTypes.string

};

export default CompaniesList;