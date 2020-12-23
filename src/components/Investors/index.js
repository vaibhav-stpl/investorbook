import React , { useState ,useRef }from 'react'
import { withRouter } from "react-router";
import InvestorsList from './list'
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap-modal';
import { ToastContainer } from "react-toastr";
import { useMutation } from '@apollo/client';
import { ADD_INVESTOR } from './constants'


const Investors = (props) =>{
  const [activePage, setActivePage ] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [searchFilter, setSearchFilter ] = useState('')
  const [formData , setFormData ] = useState({})
  const [insert_investor_one, addInvestor ] = useMutation(ADD_INVESTOR);

  const [offset, setOffset ] = useState(0);
  const limit = 10;
  const toastr = useRef();

  const search_filter = useRef();
 
  const handlePageChange = ( page) => {
    setActivePage(page)
    const offest = page === '1' ? 0 : parseInt((page-1)+"1")
    setOffset(offest)
  }
  const openModalFun = () => {
    setOpenModal(true)
}
  const closeModalFun = () => {
      setOpenModal(false)
  }
  const handleFilter = (event) => {
    setSearchFilter(search_filter.current.value)
  }
  const handleChange = (event) => {
    formData[event.target.name] = event.target.value;
    setFormData(formData)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    insert_investor_one({name: formData.name, photo_large: formData.photo_large, photo_thumbnail: formData.photo_thumbnail}).then((data)=>{
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
        <h4 class="search-title">Investors</h4>
        <button class="search-investor" onClick={openModalFun}>Add investor</button>
        <div class="search-wrap">
          <input type='text' ref={search_filter} name='searchFilter'  />
          <button class="search" onClick={handleFilter} >search</button>
        </div>
        </div>
        <InvestorsList limit={ limit } offset={ offset } searchFilter={searchFilter} />
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
            
          <span>{addInvestor.error?.message}</span>
          <div>
              <h4>Add Investor</h4>
              <h4>Please enter details of the investor</h4>
              <form onSubmit={handleSubmit}>
                  <input type='text' name='name' onChange={(event) => handleChange(event)} placeholder='name' /><br/>
                  <input type='text' name='photo_large' onChange={(event) => handleChange(event)} placeholder='photo_large' /><br/>
                  <input type='text' name='photo_thumbnail' onChange={(event) => handleChange(event)} placeholder='photo_thumbnail'  /><br/>

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
Investors.propTypes = {

};
export default withRouter(Investors);