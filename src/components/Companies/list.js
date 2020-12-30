import React , {useState, useEffect} from 'react'
import Investors from './getInvestors'
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import Loader from '../../helpers/loader'

const CompaniesList = (props) =>{
  const {loading, error,data } = props
  const [companies, setCompanies ] = useState([])
  useEffect(() => {
    if (data) {
      setCompanies(data?.company)
    }
  },[data])


  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  if (companies?.length === 0) return <p>The database is empty!</p>

  return(
    <table className='investor-table table'>
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
          <td className="table-img">
          <div className="table-name">{name}</div>
            </td>
          <td className="table-desp"><Investors id={ id }/></td>
        </tr>
        ))
        }
      </tbody>
    </table>

  )
  
  
  
}
CompaniesList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  data: PropTypes.any,

};

export default withRouter(CompaniesList);