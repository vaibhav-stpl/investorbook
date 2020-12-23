import React, { useState , useRef} from 'react'
import { useQuery , useMutation} from '@apollo/client';
import { withRouter } from "react-router";
import InvestmentorsList from './investorsList'
import { Modal } from 'react-bootstrap'

import { ToastContainer } from "react-toastr";
import Select from "react-dropdown-select";
import { ADD_INVESTMENT,UPDATE_INVESTMENT, UPDATE_COMPANY, DELETE_INVESTMENT,DELETE_COMPANY, GET_COMPANY} from './constants'

const Company = (props) =>{
    const [openModal, setOpenModal] = useState(false)
    const [ investorId, setInvestor] = useState(null)
    const [ amount, setAmount] = useState(null)
    const [editData, setEditData ] = useState({})
    const [editable, setEditable ] = useState(false)
    const [insert_investment_one, addInvestment ] = useMutation(ADD_INVESTMENT);
    const [update_investment_by_pk, UpdateInvestment ] = useMutation(UPDATE_INVESTMENT);
    const [update_company_by_pk] = useMutation(UPDATE_COMPANY)
    const [delete_investment_by_pk ] = useMutation(DELETE_INVESTMENT);
    const [delete_company_by_pk ] = useMutation(DELETE_COMPANY);


    const id =  props.history.location.pathname.split('/')[2]
    const toastr = useRef();
    const company_name = useRef();


    const { loading, error, data } = useQuery(GET_COMPANY, {
        variables: { id: parseInt(id) }
    });
 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data.company_by_pk) return <p>The database is empty!</p>
    console.log(data)

    const openModalFun = () => {
        setOpenModal(true)
    }
    const closeModalFun = () => {
        setOpenModal(false)
        setEditData({})
    }

   

    const handleChange = (event) => {
        setAmount(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(editData.id){
          updateData(event)
        }else{
          insert_investment_one({ variables: {amount: amount,investor_id: investorId,company_id: data.company_by_pk.id } }).then((data)=>{
            closeModalFun()
            toastr.current.success('Successfully Created','Success')
            props.history.push(`/companies/${ id }`)
            props.history.go();
          }).catch((error)=>{
          })
        }
    }

    const updateData = (event) =>{
      const amt = amount || editData.amount
      update_investment_by_pk({variables: {id: editData.id, amount: amt}}).then((data)=>{
        closeModalFun()
        toastr.current.success('Successfully Updated!','Success')
        props.history.push(`/companies/${ id }`)
        props.history.go();
      }).catch((error)=>{
        toastr.current.error(error.message, 'Error')
      })
    }

    const handleEdit = (item) => {
      setOpenModal(true)
      setEditData(item)
    }

    const handleDelete = (item) => {
      delete_investment_by_pk({variables: {id: item.id}}).then((data)=>{
        toastr.current.success('Successfully Deleted!','Success')
        props.history.push(`/companies/${ id }`)
        props.history.go();

      }).catch((error)=>{
        toastr.current.error(error.message, 'Error')
      })
    }



  const updateCompany = () => {
    const name = company_name.current.value
    update_company_by_pk({variables: {id: id, name: name}}).then((data)=>{
      toastr.current.success('Successfully Updated!','Success')
      props.history.push(`/companies/${ id }`)
      props.history.go();
    }).catch((error)=>{
      toastr.current.error(error.message, 'Error')
    })
  }
  const deleteCompany = () => {
    delete_company_by_pk({variables: {id: id}}).then((data)=>{
      toastr.current.success('Successfully Deleted!','Success')
      props.history.push(`/`)
      props.history.go();
    }).catch((error)=>{
      toastr.current.error(error.message, 'Error')
    })
  }

  const options = data.investor.map((item) => ({label: item.name, value: item.id}))
  return(
   <div>
     <ToastContainer
          className="toast-top-right"
          ref={toastr}
        />
     <button onClick={ () => props.history.push('/')} >Back </button>
        <div className='heading'>
          <p>
          {
            editable ? 
            <React.Fragment>
              <input type='text' ref={company_name} name='investor' defaultValue={ data.company_by_pk.name } />
              <button onClick={updateCompany} >update</button>
            </React.Fragment> :
          data.company_by_pk.name}</p>
          <div className='investor-action'>
            <button onClick={() => setEditable(true) }>Edit</button>
            <button onClick={() => deleteCompany() }>Delete</button>
          </div>
        </div>
        <button onClick={openModalFun}>Add Investments</button>
        <InvestmentorsList 
          id={data.company_by_pk.id} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          addInvestment={addInvestment}
          
        />
        <Modal
          show={openModal}
          onHide={closeModalFun}
        >
            <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
              
            <span>{addInvestment.error?.message || UpdateInvestment.error?.message}</span>
            <div>
                <h4>Add Investor</h4>
                <h4>Please enter details of the investor</h4>
                <form onSubmit={handleSubmit}>
                    <Select disabled={editData.id} options={options} onChange={(values) => setInvestor(values[0]?.value)} values={options.filter((item) => item?.value === editData.investor?.id)} placeholder={'please select investors'} />
                    <input type='number' name='amount' onChange={(event) => handleChange(event)} defaultValue={editData.amount} />
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
Company.propTypes = {
};
export default withRouter(Company);