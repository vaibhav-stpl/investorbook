import React, { useState , useRef} from 'react'
import { useQuery, gql , useMutation} from '@apollo/client';
import { withRouter } from "react-router";
import Investments from '../Investments/list'
import Modal from 'react-bootstrap-modal';
import { ToastContainer } from "react-toastr";
// Example of a component that uses apollo-client to fetch data.

const GET_COMPANY = gql`
  query GetCompany($id: Int!) {
    company_by_pk(id: $id) {
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

const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: Int!, $name: String!) {
    update_company_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
      id
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: Int!) {
    delete_company_by_pk(id: $id) {
      id
    }
  }
`;
const Company = (props) =>{
    const [openModal, setOpenModal] = useState(false)
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
          insert_investment_one({ variables: {amount: amount, company_id: data.company_by_pk.id } }).then((data)=>{
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
    
  return(
   <div>
     <ToastContainer
          className="toast-top-right"
          ref={toastr}
        />
     <button onClick={ () => props.history.goBack()} >Back </button>
        <div className='heading'>
          <p>
          {
            editable ? 
            <React.Fragment>
              <input type='text' ref={company_name} name='investor' defaultValue={ data.company_by_pk.name } />
              <button onClick={updateCompany} >update</button>
            </React.Fragment> :
          data.investor_by_pk.name}</p>
          <div className='investor-action'>
            <button onClick={() => setEditable(true) }>Edit</button>
            <button onClick={() => deleteCompany() }>Delete</button>
          </div>
        </div>
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
                    <input type='text' name='name' onChange={(event) => handleChange(event)} defaultValue={editData.name} />
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