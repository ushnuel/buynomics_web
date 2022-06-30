import apiCall from '../apiCall';
import Button from '../components/button';
import Loading from '../components/loading';
import { useParams, useNavigate } from "react-router-dom";
import sortIntermidiaries from '../helpers/sortIntermidiaries';
import React, { useEffect, useContext, useState } from 'react';
import { Input, Select, Label } from "../components/formComponents";
import { IntermidiaryListContext } from '../context/IntermidiaryListContext';
import IntermidiaryDetailsContainer from '../components/intermidiaryDetailsContainer';

const Edit = () => {
  const { intermidiaries, isLoading, setIntermidiaries } = useContext(IntermidiaryListContext);

  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const [intermidiary_order, setIntermidiaryOrder] = useState("");

  const {id: intermidiaryId } = useParams();
  const navigate = useNavigate();

  const intermidiary = intermidiaries.find(item => (item.id).toString() === intermidiaryId);

  const intermidiaryName = intermidiary ? intermidiary.name : null;
  const intermidiaryOrder = intermidiary ? intermidiary.intermidiary_order : null;
  const orderId = intermidiary && intermidiaryOrder ? intermidiaryOrder.id : null;

  useEffect(() => {
    if (intermidiary) { 
      setEditName(intermidiaryName);
      setIntermidiaryOrder(orderId);
    }
  }, [intermidiaryName, intermidiary, orderId, intermidiaries]);

  function navigateToHome() {
    navigate(`/`);
  }

  const onEditHandler = async (id) => {
    const editObject = { name: editName, intermidiary_order };

    if (editObject.name === "") {
      setError("Name cannot be empty");
      return;
    }

    if (editObject.intermidiary_order === "") {
      setError("Order cannot be empty");
      return;
    }

    try {
      const response = await apiCall.put(`/intermidiaries/${id}`, editObject);
      const newIntermidiaryLists = intermidiaries.map(item => item.id === id ? { ...response.data.data } : item);
      const sortedIntermidiaries = sortIntermidiaries(newIntermidiaryLists);
      setIntermidiaries(sortedIntermidiaries);
      navigateToHome();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }
    }
  }    
  
  function renderIntermidiaryDetails() {
    if (isLoading) {
      return <Loading />
    }

    if (!intermidiary) {
      return <div className='text-center text-red-500 text-lg'>Invalid Intermidiary Found; Invalid id.</div>
    }

    const { type } = intermidiary;
    const intermidiaryType = type.hasOwnProperty("range") ? "Range" : "Dropdown";

    return (
      <form className='w-full' onSubmit={(e) => e.preventDefault()}>
        <div className='mb-3'>
          <Label label="Intermidiary Name" />
          <Input 
            onChange={(e) => setEditName(e.target.value)} 
            value={editName} placeholder="Enter the name"
            name="name"
          />
        </div>
        <div className='mb-3'>
          <Label label="Order" />
          <Input 
            onChange={(e) => setIntermidiaryOrder(e.target.value)} 
            type="number" value={intermidiary_order} 
            placeholder="Enter the order"
            name="intermidiary_order"
           />
        </div>
        <div className='mb-3'>
          <Label label="Type" />
          <Select isReadonly={true} defaultValue={intermidiaryType}>
            <option value={intermidiaryType}>{intermidiaryType}</option>
          </Select>
        </div>
        <div className='flex items-center mt-5'>
          <Button 
            className="mr-5 bg-blue-400" 
            text="Edit" 
            type="sumbit" 
            onClick={() => onEditHandler(intermidiary.id)} 
          />
          <Button 
            className="bg-gray-400" 
            text="Cancel"
            type="button"
            onClick={navigateToHome}
           />
        </div> 
      </form>
    )
  }

  return ( 
    <IntermidiaryDetailsContainer error={error}>
      {renderIntermidiaryDetails()}
    </IntermidiaryDetailsContainer>
   );
}

export default Edit;