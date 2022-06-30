import apiCall from '../apiCall';
import Button from '../components/button';
import Loading from '../components/loading';
import { useNavigate } from "react-router-dom";
import ShowOrders from '../helpers/showOrders';
import getOrderIds from '../helpers/getOrderIds';
import React, { useContext, useState } from 'react';
import { OrdersContext } from '../context/OrdersContext';
import sortIntermidiaries from '../helpers/sortIntermidiaries';
import { Input, Select, Label } from "../components/formComponents";
import { IntermidiaryListContext } from '../context/IntermidiaryListContext';
import IntermidiaryDetailsContainer from '../components/intermidiaryDetailsContainer';

const AddIntermidiary = () => {
  const ordersContext = useContext(OrdersContext);
  const intermediaryListContext = useContext(IntermidiaryListContext);

  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");
  const [step, setStep] = useState("");
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [error, setError] = useState("");
  const [orderIsValid, setOrderIsValid] = useState(true);
  const [fromIsLessThanTo, setFromIsLessThanTo] = useState(true);
  const [OptionValueInput, setOptionValueInput] = useState([{ option: '', value: '' }])

  const rangeTypePayload = JSON.stringify({ range: { from: rangeFrom, to: rangeTo, step }});
  const dropDownTypePayload = JSON.stringify({ dropDown: OptionValueInput});

  const navigate = useNavigate();

  function navigateToHome() {
    navigate(`/`);
  }

  if (!intermediaryListContext || !ordersContext) return <Loading />

  const { intermidiaries, isLoading, setIntermidiaries } = intermediaryListContext;
  const orders = getOrderIds(ordersContext.orders);

  function onOrderOnblurHandler(val) {
    const validOrder = orders.includes(+val);
    if (!validOrder) {
      setOrderIsValid(false);
    } else {
      setOrderIsValid(true);
    }
  }

  function onRangeToOnblurHandler(val) {
    if (+rangeFrom < +val || +rangeTo > +val) {
      setFromIsLessThanTo(true);
    } else {
      setFromIsLessThanTo(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data = { 
      name, 
      intermidiary_order: order, 
      type: type === "Range" ? rangeTypePayload : dropDownTypePayload
    };

    if (data.name === "") {
      setError("Please enter a name");
      return;
    }

    if (data.intermidiary_order === "") {
      setError("Please select an order");
      return;
    }

    setOrderIsValid(true)

    try {
      const response = await apiCall.post(`/intermidiaries`, data);
      const sortedOrders = sortIntermidiaries([...intermidiaries, response.data.data]);
      setIntermidiaries(sortedOrders);
      navigateToHome()
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }
    }
  }

  function onOptionValueInputChangeHandler(index, e) {
    const newOptionValueInput = [...OptionValueInput];
    newOptionValueInput[index][e.target.name] = e.target.value;
    setOptionValueInput(newOptionValueInput);
  }

  const addNewOptionValueInput = () => {
    setOptionValueInput([...OptionValueInput, { option: '', value: '' }]);
  }

  const buttonIsDisabled = name === "" || !orderIsValid || !fromIsLessThanTo ? true : false;

  function renderIntermidiaryDetails() {
    if (isLoading) {
      return <Loading />
    }

    return (
      <form className='w-full' onSubmit={onSubmitHandler}>
        <div className='mb-3'>
          <Label label="Intermidiary Name" />
          <Input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            placeholder="Enter the name"
            name="name"
          />
        </div>
        <div className='mb-3'>
          <Label label="Order" />
          <Input 
            onChange={(e) => setOrder(e.target.value)} 
            type="number" 
            value={order} 
            placeholder="Enter the order"
            name="intermidiary_order"
            onBlur={(e) => onOrderOnblurHandler(e.target.value)}
           />
           {!orderIsValid && <small className="text-red-500 text-sm">Please choose an order on the supply chain</small>}
        </div>
        <div className='mb-3'>
          <Label label="Type" />
          <Select defaultValue="Select a type" onChange={(e) => setType(e.target.value)}>
            <option value="Select a type" disabled>Select a type</option>
            <option value="Range">Range</option>
            <option value="Drop Down">Drop Down</option>
          </Select>
          {
            type === "Range" &&
              <>
                <div className='flex justify-evenly items-center mt-3'>
                  <Input onChange={(e) => setRangeFrom(e.target.value)}
                    value={rangeFrom} placeholder="From" type="number"
                    name="rangeFrom" step="0.000001"
                    onBlur={(e) => onRangeToOnblurHandler(e.target.value)}
                  />
                  <Input onChange={(e) => setRangeTo(e.target.value)}
                    value={rangeTo} placeholder="To"
                    name="rangeTo" step="0.000001" type="number"
                    onBlur={(e) => onRangeToOnblurHandler(e.target.value)}
                  />
                  <Input onChange={(e) => setStep(e.target.value)}
                    value={step} placeholder="Step"
                    type="number" step="0.000001" min="0"
                    name="step"
                  />
                </div>
                {!fromIsLessThanTo && <small className="text-red-500 text-sm">From must be less than To</small>}
              </>
          }{
            type === "Drop Down" &&
            <>
              {OptionValueInput.map((input, index) => (
                <div key={index} className="flex justify-between mt-3">
                  <Input
                    name='option'
                    placeholder='Option'
                    value={input.option}
                    onChange={(e) => onOptionValueInputChangeHandler(index, e)}
                  />
                  <Input
                    name='value'
                    placeholder='Value'
                    value={input.value}
                    onChange={(e) => onOptionValueInputChangeHandler(index, e)}
                  />
                </div>
              ))}
              <Button type="button" onClick={addNewOptionValueInput} text="add new element" className="bg-zinc-500 mt-3 mb-5" />
            </>
          }          
        </div>
        <div className='flex items-center mt-5'>
          <Button 
            className={`${buttonIsDisabled ? "bg-gray-300" : "bg-green-400"} mr-5`}
            text="Add" 
            type="submit"
            disabled={!orderIsValid || !name ? true : false}
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
      <ShowOrders />
      {renderIntermidiaryDetails()}
    </IntermidiaryDetailsContainer>
  );
}
 
export default AddIntermidiary;