import React, { useState , useRef} from 'react'
import { useQuery , useMutation} from '@apollo/client';
import { withRouter } from "react-router";
import InvestmentsList from './investmentsList'
import { Modal } from 'react-bootstrap'
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
import {GET_INVESTMENTS_BY_INVESTOR, ADD_INVESTMENT,UPDATE_INVESTMENT,GET_INVESTOR , UPDATE_INVESTOR ,DELETE_INVESTMENT, DELETE_INVESTOR} from './constants'
import Loader from '../../helpers/loader'

const Investor = (props) =>{
    const [openModal, setOpenModal] = useState(false)
    const [ companyId, setCompany] = useState(null)
    const [ amount, setAmount] = useState(null)
    const [editData, setEditData ] = useState({})
    const [editable, setEditable ] = useState(false)
    const [deletedInvestments, setDeletedInvestments] = useState([])
    const id =  props.history.location.pathname.split('/')[2]

    const [insert_investment_one, addInvestment ] = useMutation(ADD_INVESTMENT,{
      refetchQueries: [
        { query: GET_INVESTMENTS_BY_INVESTOR, variables: {investor_id: id} }
      ]
    });
    const [update_investment_by_pk, UpdateInvestment ] = useMutation(UPDATE_INVESTMENT,{
      refetchQueries: [
        { query: GET_INVESTMENTS_BY_INVESTOR, variables: {investor_id: id} }
      ]
    });
    const [update_investor_by_pk] = useMutation(UPDATE_INVESTOR,{
      refetchQueries: [
        { query: GET_INVESTOR, variables: {id: id} }
      ]
    })
    const [delete_investment_by_pk ] = useMutation(DELETE_INVESTMENT,{
      refetchQueries: [
        { query: GET_INVESTMENTS_BY_INVESTOR, variables: {investor_id: id} }
      ]
    });
    const [delete_investor_by_pk ] = useMutation(DELETE_INVESTOR,{
      refetchQueries: [
        { query: GET_INVESTOR, variables: {id: id} }
      ]
    });

    const investor_name = useRef();
    const { loading, error, data } = useQuery(GET_INVESTOR, {
        variables: { id: parseInt(id) }
    });
    
    if (loading) return <Loader />;
    if (error) return <p>Error :(</p>;
    if (!data.investor_by_pk) return <p>The database is empty!</p>

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
          insert_investment_one({ variables: { amount: parseFloat(amount), company_id: companyId, investor_id: data.investor_by_pk.id } }).then((data)=>{
            closeModalFun()
            toast.success('Successfully Created','Success')
          }).catch((error)=>{
          })
        }
    }

    const updateData = (event) =>{
      const amt = amount || editData.amount
      const company_id = companyId || editData.company_id
      update_investment_by_pk({variables: {id: editData.id, amount: amt, company_id: company_id}}).then((data)=>{
        closeModalFun()
        toast.success('Successfully Updated!','Success')
      }).catch((error)=>{
        toast.error(error.message, 'Error')
      })
    }

    const handleEdit = (item) => {
      setOpenModal(true)
      setEditData(item)
    }

    const handleDelete = (item) => {
      delete_investment_by_pk({variables: {id: item.id}}).then((data)=>{
        const objects = [...deletedInvestments]
        objects.push(data.data.delete_investment_by_pk.id)
        setDeletedInvestments(objects)

        toast.success('Successfully Deleted!','Success')
      }).catch((error)=>{
        toast.error(error.message, 'Error')
      })
    }



  const updateInvestor = () => {
    const name = investor_name.current.value
    update_investor_by_pk({variables: {id: id, name: name}}).then((data)=>{
      toast.success('Successfully Updated!','Success')
      setEditable(false)
    }).catch((error)=>{
      toast.error(error.message, 'Error')
    })
  }
  const deleteInvestor = () => {
    delete_investor_by_pk({variables: {id: id}}).then((data)=>{
      toast.success('Successfully Deleted!','Success')
      props.history.push(`/`)
      props.history.go()
    }).catch((error)=>{
      toast.error(error.message, 'Error')
    })
  }
    
  const options = data.company.map((item) => ({label: item.name, value: item.id}))
  return(
    <div className="main-wrapper">

          <div className="container">
        <div className='heading'>
        <button className="transparent-btn heading-btn" onClick={ () => props.history.push('/')} > 
        <img src="/images/back.png" alt='back'/> </button>
          <p className="heading-name">
            <img className="round heading-image" src={data.investor_by_pk.photo_thumbnail} alt={data.investor_by_pk.id} /> 
          {
            editable ? 
            <React.Fragment>
              <input type='text' ref={investor_name} name='investor' defaultValue={ data.investor_by_pk.name } />
              <button onClick={updateInvestor} >update</button>
            </React.Fragment> :
          data.investor_by_pk.name}</p>
          <div className='investor-action'>
            <button className="transparent-btn action-btn" onClick={() => setEditable(true) }>
            <img src="/images/edit-icon.png" alt='edit' />EDIT NAME</button>
            <button className="transparent-btn action-btn" onClick={() => deleteInvestor() }>
            <img src="/images/delete-icon.png" alt='edit' />EDIT NAME</button>
          </div>
        </div>
        <div className="title-wrapper">
        <p className="title">Investment</p>
        <button className="btn-transparent" onClick={openModalFun}>+ Add Investments</button>
        </div>
        <InvestmentsList 
          id={data.investor_by_pk.id} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          addInvestment={addInvestment}
          deletedInvestments={deletedInvestments}
          
        />
        <Modal
          show={openModal}
          onHide={closeModalFun}
        >
            <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
            <span>{addInvestment.error?.message || UpdateInvestment.error?.message}</span>
            <div>
                <h4>Add Investment</h4>
                <h4>Please enter details of the investment</h4>
                <form onSubmit={handleSubmit}>
                  <Select options={options} onChange={(values) => setCompany(values[0]?.value)} values={options.filter((item) => item?.value === editData.company_id)} placeholder={'Please select company'} />
                    <input type='number' name='amount' onChange={(event) => handleChange(event)} defaultValue={editData.amount} placeholder='Amount'/>
                    <input type='button' onClick={closeModalFun} value='cancel'/>
                    <input type='submit' value='submit'/>
                </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>


        </Modal>
   </div>
   </div>

  )
  
  
  
}
Investor.propTypes = {
};
export default withRouter(Investor);