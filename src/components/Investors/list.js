import React , { useEffect , useState}from 'react'
import Investments from './getInvestments'
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import Loader from '../../helpers/loader'

// Example of a component that uses apollo-client to fetch data.


const InvestorsList = (props) =>{
  const {loading,error ,data } = props
  const [investors, setInvestors ] = useState([])
  useEffect(() => {
    if (data) {
      setInvestors(data?.investor)
    }
  },[data])


  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
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
  loading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.any,
  id: PropTypes.number

};
export default withRouter(InvestorsList);