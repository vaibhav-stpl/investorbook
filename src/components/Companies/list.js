import React , {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import Investors from './getInvestors'
import PropTypes from 'prop-types';
import { GET_COMPANIES , GET_FILTERS} from './constants'
import { withRouter } from "react-router";

const CompaniesList = (props) =>{
  const {offset, limit,searchFilter } = props
  const { loading, error, data } = useQuery(GET_COMPANIES,{ skip: searchFilter!=='' ,variables: {offset: offset, limit: limit}});
  const { loading: sloading, error: serror, data: sdata } = useQuery(GET_FILTERS,{skip: searchFilter==='',variables: {search: searchFilter}});
  const [companies, setCompanies ] = useState([])
  useEffect(() => {
    if (data || sdata) {
      setCompanies(data?.company || sdata?.company)
    }
  },[data, sdata])


  if (loading || sloading) return <p>Loading...</p>;
  if (error || serror) return <p>Error :(</p>;
  if (companies?.length === 0) return <p>The database is empty!</p>
  console.log(data)

  return(
    <table >
      <thead>
        <tr>
          <th>Name</th>
          <th>Investors</th>
        </tr>
      </thead>
      <tbody>
        {
        companies?.map(({ id, name }) => (

          <tr className="table-row" key={id} onClick={ () => { props.history.push(`companies/${id}`)}}>
          <td className="table-name">{name}</td>
          <td className="table-desp"><Investors id={ id }/></td>
        </tr>
        ))
        }
      </tbody>
    </table>

  )
  
  
  
}
CompaniesList.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  searchFilter: PropTypes.string

};

export default withRouter(CompaniesList);