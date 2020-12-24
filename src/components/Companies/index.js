import React , { useState ,useRef }from 'react'
import { withRouter } from "react-router";
import CompaniesList from './list'
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { Modal } from 'react-bootstrap'
import { ADD_COMPANY } from './constants'
import { GET_COMPANIES } from './constants'

const Companies = (props) =>{
  const [activePage, setActivePage ] = useState(1)
  const [searchFilter, setSearchFilter ] = useState('')
  const [formData , setFormData ] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [offset, setOffset ] = useState(0);
  const search_filter = useRef();
  const limit = 10;
  const [insert_company_one, addCompany ] = useMutation(ADD_COMPANY,{
    refetchQueries: [
      { query: GET_COMPANIES, variables: {offset: offset, limit: limit} }
    ]
  });


  const handlePageChange = ( page) => {
    setActivePage(page)
    const offest = page === '1' ? 0 : parseInt((page-1)+"1")
    setOffset(offest)
  }
  const handleFilter = (event) => {
    setSearchFilter(search_filter.current.value)
  }

  const openModalFun = () => {
    setOpenModal(true)
}
  const closeModalFun = () => {
      setOpenModal(false)
  }
  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    insert_company_one({variables: {name: formData.name}}).then((data)=>{
      closeModalFun()
      toast.success('Successfully Created','Success');
    }).catch((error)=>{
    })
  }
  return(
    <div >
      <div className="search-wrapper"> 
      <h4 className="search-title">Companies</h4>
      <button className="search-investor" onClick={openModalFun}>Add company</button>
      <div className="search-wrap">
       <input type='text' ref={search_filter} name='searchFilter'  />
       <button className="search" onClick={handleFilter} >search</button>
       </div>
       </div>
       <div className='list'>
          <CompaniesList limit={ limit } offset={ offset } searchFilter={searchFilter}  />
        </div>
        {
          searchFilter !=='' ? null : <Pagination
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={400}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          /> 
        }

<Modal
        show={openModal}
        onHide={closeModalFun}
      >
          <Modal.Header closeButton>
          <span>{addCompany.error?.message}</span>
          <Modal.Title>
              <h4>Add Company</h4>
              <p>Please enter details of the company</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <div>
              <form onSubmit={handleSubmit}>
                  <input className="form-input" type='text' name='name' onChange={(event) => handleChange(event)} placeholder='Name' /><br/>
                  <input className="btn-transparent" type='button' onClick={closeModalFun} value='cancel'/>
                  <input className="btn-theme" type='submit' value='submit'/>
              </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>


      </Modal>
    </div>

  )
  
  
  
}
Companies.propTypes = {

};
export default withRouter(Companies);