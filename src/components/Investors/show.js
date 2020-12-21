import React, { useState, useEffect } from 'react'
import { useQuery, gql , useMutation} from '@apollo/client';
import { withRouter } from "react-router";
import Investments from '../Investments/list'
import Modal from 'react-bootstrap-modal';
import Select from "react-dropdown-select";


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


const Investor = (props) =>{
    const [openModal, setOpenModal] = useState(false)
    const [ companyId, setCompany] = useState(null)
    const [ amount, setAmount] = useState(null)
    const [insert_investment_one, addInvestment ] = useMutation(ADD_INVESTMENT);
    const id =  props.history.location.pathname.split('/')[2]
    const { loading, error, data } = useQuery(GET_INVESTOR, {
        variables: { id: parseInt(id) }
    });
    useEffect(() =>{
        if(addInvestment.data){
            closeModalFun()
        }
    },[addInvestment.data] )
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data.investor_by_pk) return <p>The database is empty!</p>
    console.log(data)

    const openModalFun = () => {
        setOpenModal(true)
    }
    const closeModalFun = () => {
        setOpenModal(false)
    }

   

    const handleChange = (event) => {
        setAmount(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        insert_investment_one({ variables: { amount: parseFloat(amount), company_id: companyId, investor_id: data.investor_by_pk.id } })
        //closeModalFun()
        
    }
    
  const options = data.company.map((item) => ({label: item.name, value: item.id}))
  return(
   <div>
       <p><img src={data.investor_by_pk.photo_thumbnail} alt={data.investor_by_pk.id} /> {data.investor_by_pk.name}</p>
        <button onClick={openModalFun}>Add Investments</button>
        <Investments id={data.investor_by_pk.id} addInvestment={addInvestment} />
        <Modal
          show={openModal}
          onHide={closeModalFun}
        >
            <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
            <span>{addInvestment.error?.message}</span>
            <div>
                <h4>Add Investment</h4>
                <h4>Please enter details of the investment</h4>
                <form onSubmit={handleSubmit}>
                <Select options={options} onChange={(values) => setCompany(values[0].value)} />
                    <input type='number' name='amount' onChange={(event) => handleChange(event)} />
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

export default withRouter(Investor);