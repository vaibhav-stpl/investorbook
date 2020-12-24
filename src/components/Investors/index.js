import React , { useState ,useRef }from 'react'
import { withRouter } from "react-router";
import InvestorsList from './list'
import Pagination from "react-js-pagination";
import { Modal } from 'react-bootstrap'
import { toast } from "react-toastify";
import { useMutation } from '@apollo/client';
import { ADD_INVESTOR } from './constants'
import { GET_INVESTORS } from './constants'


const Investors = (props) =>{
  const [activePage, setActivePage ] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [searchFilter, setSearchFilter ] = useState('')
  const [formData , setFormData ] = useState({})
  const [offset, setOffset ] = useState(0);

  const limit = 10;
  const [insert_investor_one, addInvestor ] = useMutation(ADD_INVESTOR,{
    refetchQueries: [
      { query: GET_INVESTORS,variables: {offset: offset, limit: limit} }
    ]
  });


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
    insert_investor_one({variables: {name: formData.name, photo_large: formData.photo_large, photo_thumbnail: formData.photo_thumbnail}}).then((data)=>{
      closeModalFun()
      toast.success('Successfully Created')
    }).catch((error)=>{
    })
  }
  return(
    <div className='container' >
        <div className="search-wrapper">       
        <h4 className="search-title">Investors</h4>
        <button className="search-investor" onClick={openModalFun}>Add investor</button>
        <div className="search-wrap">
          <input type='text' ref={search_filter} name='searchFilter'  />
          <button className="search" onClick={handleFilter} >search</button>
        </div>
        </div>
        <div className='list'>
          <InvestorsList limit={ limit } offset={ offset } searchFilter={searchFilter} />
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
          <span>{addInvestor.error?.message}</span>
          <Modal.Title>
          <h4>Add Investor</h4>
              <p>Please enter details of the investor</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <div>
              
              <form onSubmit={handleSubmit}>
                  <input className="form-input" type='text' name='name' onChange={(event) => handleChange(event)} placeholder='Name' /><br/>
                  <input className="form-input" type='text' name='photo_large' onChange={(event) => handleChange(event)} placeholder='Photo large url' /><br/>
                  <input className="form-input" type='text' name='photo_thumbnail' onChange={(event) => handleChange(event)} placeholder='Photo thumbnail url'  /><br/>

                  <input className="btn-transparent" type='button' onClick={closeModalFun} value='cancel'/>
                  <input className="btn-theme" type='submit' value='submit'/>
              </form>
          </div>
        </Modal.Body>


      </Modal>
    </div>

  )
  
  
  
}
Investors.propTypes = {

};
export default withRouter(Investors);