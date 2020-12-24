import React , { useEffect , useState}from 'react'
import { useQuery } from '@apollo/client';
import Investments from './getInvestments'
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { GET_INVESTORS,GET_FILTERS } from './constants'
import Loader from '../../helpers/loader'

// Example of a component that uses apollo-client to fetch data.


const InvestorsList = (props) =>{
  const {offset, limit,searchFilter } = props
  const { loading, error, data } = useQuery(GET_INVESTORS,{ skip: searchFilter!=='' ,variables: {offset: offset, limit: limit}});
  const { loading: sloading, error: serror, data: sdata } = useQuery(GET_FILTERS,{skip: searchFilter==='',variables: {search: searchFilter}});
  const [investors, setInvestors ] = useState([])
  useEffect(() => {
    if (data || sdata) {
      setInvestors(data?.investor || sdata?.investor)
    }
  },[data, sdata])


  if (loading || sloading) return <Loader />;
  if (error || serror) return <p>Error :(</p>;
  if (investors.length === 0) return <p>The database is empty!</p>
  

  return(
    <table className='investor-table table' >
      <thead>
      <tr>
        <th>Name</th>
        <th>Investments</th>
      </tr>
      </thead>
      <tbody>
      {
      investors.map(({ id, name, photo_thumbnail }) => (

      <tr className="table-row" key={id} onClick={ () => { props.history.push(`investors/${id}`)}}>
        <td className="table-img">
          <div className="table-img-wrap">
            <img className="round" src={photo_thumbnail} alt={id} />
          </div>
          <div className="table-name">{name}</div>
        </td>
        
        <td className="table-desp"><Investments id={ id }/></td>
      </tr>
      ))
      }
      </tbody>
    </table>

  )
  
  
  
}
InvestorsList.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  searchFilter: PropTypes.string,
  id: PropTypes.number

};
export default withRouter(InvestorsList);