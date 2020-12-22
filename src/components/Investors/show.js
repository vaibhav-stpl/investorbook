import React, { useState , useRef} from 'react'
import { useQuery, gql , useMutation} from '@apollo/client';
import { withRouter } from "react-router";
import Investments from '../Investments/list'
import Modal from 'react-bootstrap-modal';
import Select from "react-dropdown-select";
import { ToastContainer } from "react-toastr";
// Example of a component that uses apollo-client to fetch data.

const GET_INVESTOR = gql`
  query GetInvestor($id: Int!) {
    investor_by_pk(id: $id) {
          id
          name
          photo_large
          photo_thumbnail
    }
    company(limit: 100){
        id
        name
    }
  }
`;
const ADD_INVESTMENT = gql`
  mutation AddInvestment($company_id: Int!, $amount: numeric, $investor_id: Int!) {
    insert_investment_one(object: {company_id: $company_id,amount:  $amount, investor_id: $investor_id}) {
      id
      company_id
      amount
    }
  }
`;
const UPDATE_INVESTMENT = gql`
  mutation UpdateInvestment($id: Int!, $amount: numeric, $company_id: Int!) {
    update_investment_by_pk(pk_columns: {id: $id}, _set: {amount: $amount, company_id: $company_id}) {
      id
    }
  }
`;

const DELETE_INVESTMENT = gql`
  mutation DeleteInvestment($id: Int!) {
    delete_investment_by_pk(id: $id) {
      id
    }
  }
`;

const Investor = (props) =>{
    const [openModal, setOpenModal] = useState(false)
    const [ companyId, setCompany] = useState(null)
    const [ amount, setAmount] = useState(null)
    const [editData, setEditData ] = useState({})
    const [insert_investment_one, addInvestment ] = useMutation(ADD_INVESTMENT);
    const [update_investment_by_pk, UpdateInvestment ] = useMutation(UPDATE_INVESTMENT);
    const [delete_investment_by_pk ] = useMutation(DELETE_INVESTMENT);

    const id =  props.history.location.pathname.split('/')[2]
    const toastr = useRef();


    const { loading, error, data } = useQuery(GET_INVESTOR, {
        variables: { id: parseInt(id) }
    });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data.investor_by_pk) return <p>The database is empty!</p>
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
          insert_investment_one({ variables: { amount: parseFloat(amount), company_id: companyId, investor_id: data.investor_by_pk.id } }).then((data)=>{
            closeModalFun()
            toastr.current.success('Successfully Created','Success')
            props.history.push(`/investors/${ id }`)
            props.history.go();
          }).catch((error)=>{
          })
        }
    }

    const updateData = (event) =>{
      const amt = amount || editData.amount
      const company_id = companyId || editData.company_id
      update_investment_by_pk({variables: {id: editData.id, amount: amt, company_id: company_id}}).then((data)=>{
        closeModalFun()
        toastr.current.success('Successfully Updated!','Success')
        props.history.push(`/investors/${ id }`)
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
        props.history.push(`/investors/${ id }`)
        props.history.go();

      }).catch((error)=>{
        toastr.current.error(error.message, 'Error')
      })
    }
    
  const options = data.company.map((item) => ({label: item.name, value: item.id}))
  return(
   <div>
     <ToastContainer
          className="toast-top-right"
          ref={toastr}
        />
     <button onClick={ () => props.history.goBack()} >Back </button>
       <p><img src={data.investor_by_pk.photo_thumbnail} alt={data.investor_by_pk.id} /> {data.investor_by_pk.name}</p>
        <button onClick={openModalFun}>Add Investments</button>
        <Investments 
          id={data.investor_by_pk.id} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          addInvestment={addInvestment}
          
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
                <Select options={options} onChange={(values) => setCompany(values[0]?.value)} values={options.filter((item) => item?.value === editData.company_id)} />
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
Investor.propTypes = {
};
export default withRouter(Investor);