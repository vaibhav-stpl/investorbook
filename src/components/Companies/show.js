import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { withRouter } from "react-router";
import InvestmentorsList from "./investorsList";
import { Modal } from "react-bootstrap";
import Loader from "../../helpers/loader";
import { toast } from "react-toastify";
import Select from "react-dropdown-select";
import {
  GET_INVESTORS_BY_COMPANY,
  ADD_INVESTMENT,
  UPDATE_INVESTMENT,
  UPDATE_COMPANY,
  DELETE_INVESTMENT,
  DELETE_COMPANY,
  GET_COMPANY,
} from "./constants";

const Company = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [investorId, setInvestor] = useState(null);
  const [amount, setAmount] = useState(null);
  const [editData, setEditData] = useState({});

  const [editable, setEditable] = useState(false);
  const id = props.history.location.pathname.split("/")[2];
  const [insert_investment_one, addInvestment] = useMutation(ADD_INVESTMENT, {
    refetchQueries: [
      { query: GET_INVESTORS_BY_COMPANY, variables: { company_id: id } },
    ],
  });
  const [update_investment_by_pk, UpdateInvestment] = useMutation(
    UPDATE_INVESTMENT,
    {
      refetchQueries: [
        { query: GET_INVESTORS_BY_COMPANY, variables: { company_id: id } },
      ],
    }
  );
  const [update_company_by_pk] = useMutation(UPDATE_COMPANY, {
    refetchQueries: [{ query: GET_COMPANY, variables: { id: id } }],
  });
  const [delete_investment_by_pk] = useMutation(DELETE_INVESTMENT, {
    refetchQueries: [
      { query: GET_INVESTORS_BY_COMPANY, variables: { company_id: id } },
    ],
  });
  const [delete_company_by_pk] = useMutation(DELETE_COMPANY, {
    refetchQueries: [{ query: GET_COMPANY, variables: { id: id } }],
  });

  const company_name = useRef();
  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;
  if (!data.company_by_pk) return <p>The database is empty!</p>;

  const openModalFun = () => {
    setOpenModal(true);
  };
  const closeModalFun = () => {
    setOpenModal(false);
    setEditData({});
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editData.id) {
      updateData(event);
    } else {
      insert_investment_one({
        variables: {
          amount: amount,
          investor_id: investorId,
          company_id: data.company_by_pk.id,
        },
      })
        .then((data) => {
          closeModalFun();
          toast.success("Successfully Created");
        })
        .catch((error) => {});
    }
  };

  const updateData = (event) => {
    const amt = amount || editData.amount;
    update_investment_by_pk({ variables: { id: editData.id, amount: amt } })
      .then((data) => {
        closeModalFun();
        toast.success("Successfully Updated!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleEdit = (item) => {
    setOpenModal(true);
    setEditData(item);
  };

  const handleDelete = (item) => {
    delete_investment_by_pk({ variables: { id: item.id } })
      .then((data) => {
        toast.success("Successfully Deleted!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const updateCompany = () => {
    const name = company_name.current.value;
    update_company_by_pk({ variables: { id: id, name: name } })
      .then((data) => {
        toast.success("Successfully Updated!");
        setEditable(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const deleteCompany = () => {
    delete_company_by_pk({ variables: { id: id } })
      .then((data) => {
        toast.success("Successfully Deleted!");
        props.history.push("/");
        props.history.go();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const options = data.investor.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  return (
    <div className="main-wrapper">
      <div className="container">
      <h3 className="logo"><span>Investor</span>Book</h3>
        <div className="heading">
          <button
            className="transparent-btn heading-btn"
            onClick={() => props.history.push("/")}
          >
            <img src="/images/back.png" alt="back" />
          </button>
          <p className="heading-name">
            {editable ? (
              <React.Fragment>
                <input
                  className="form-input heading-input"
                  type="text"
                  ref={company_name}
                  name="investor"
                  defaultValue={data.company_by_pk.name}
                />
                <button
                  className="btn-theme update-button"
                  onClick={updateCompany}
                >
                  update
                </button>
              </React.Fragment>
            ) : (
              data.company_by_pk.name
            )}
          </p>
          <div className="investor-action">
            <button
              className="transparent-btn action-btn"
              onClick={() => setEditable(true)}
            >
              <img src="/images/edit-icon.png" alt="edit" />
              EDIT NAME
            </button>
            <button
              className="transparent-btn action-btn"
              onClick={() => deleteCompany()}
            >
              <img src="/images/delete-icon.png" alt="remove" />
              REMOVE COMPANY
            </button>
          </div>
        </div>
        <div className="title-wrapper">
          <p className="title">Investors</p>
          <button className="btn-transparent" onClick={openModalFun}>
            + Add Investors
          </button>
        </div>
        <InvestmentorsList
          id={data.company_by_pk.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addInvestment={addInvestment}
        />
        <Modal show={openModal} onHide={closeModalFun}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Add Investor</h4>
              <p>Please enter details of the investor</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              {addInvestment.error?.message || UpdateInvestment.error?.message}
            </span>
            <div>
              <form onSubmit={handleSubmit}>
                <Select
                  className="form-input"
                  disabled={editData.id}
                  options={options}
                  onChange={(values) => setInvestor(values[0]?.value)}
                  values={options.filter(
                    (item) => item?.value === editData.investor?.id
                  )}
                  placeholder={"please select investors"}
                />
                <input
                  className="form-input"
                  type="number"
                  name="amount"
                  onChange={(event) => handleChange(event)}
                  defaultValue={editData.amount}
                  placeholder="Amount"
                />
                <input
                  className="btn-transparent"
                  type="button"
                  onClick={closeModalFun}
                  value="cancel"
                />
                <input className="btn-theme" type="submit" value="submit" />
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
Company.propTypes = {};
export default withRouter(Company);
