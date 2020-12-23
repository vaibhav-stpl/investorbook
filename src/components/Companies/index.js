import React , { useState ,useRef }from 'react'
import { withRouter } from "react-router";
import CompaniesList from './list'
import Pagination from "react-js-pagination";
import { ToastContainer } from "react-toastr";
import { useMutation } from '@apollo/client';
import { Modal } from 'react-bootstrap'
import { ADD_COMPANY } from './constants'

const Companies = (props) =>{
  const [activePage, setActivePage ] = useState(1)
  const [searchFilter, setSearchFilter ] = useState('')
  const [formData , setFormData ] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [offset, setOffset ] = useState(0);
  const search_filter = useRef();
  const [insert_company_one, addCompany ] = useMutation(ADD_COMPANY);
  const toastr = useRef();
  const limit = 10;


 
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
    insert_company_one({name: formData.name}).then((data)=>{
      closeModalFun()
      toastr.current.success('Successfully Created','Success')
      props.history.push(`/`)
      props.history.go();
    }).catch((error)=>{
    })
  }
  return(
    <div >
        <ToastContainer
          className="toast-top-right"
          ref={toastr}
        />
      <div class="search-wrapper"> 
      <h4 class="search-title">Companies</h4>
      <button class="search-investor" onClick={openModalFun}>Add company</button>
      <div class="search-wrap">
       <input type='text' ref={search_filter} name='searchFilter'  />
       <button class="search" onClick={handleFilter} >search</button>
       </div>
       </div>
        <CompaniesList limit={ limit } offset={ offset } searchFilter={searchFilter}  />
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
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
          <span>{addCompany.error?.message}</span>
          <div>
              <h4>Add Company</h4>
              <h4>Please enter details of the company</h4>
              <form onSubmit={handleSubmit}>
                  <input type='text' name='name' onChange={(event) => handleChange(event)} placeholder='name' /><br/>
                  <input type='button' onClick={closeModalFun} value='cancel'/>
                  <input type='submit' value='submit'/>
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