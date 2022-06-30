import moment from "moment";
import Button from "./button";
import apiCall from '../apiCall';
import React, { useContext } from 'react'
import { Table } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { IntermidiaryListContext } from '../context/IntermidiaryListContext';

const IntermidiaryList = () => {
  const { intermidiaries, setIntermidiaries } = useContext(IntermidiaryListContext);

  const navigate = useNavigate();

  async function deleteIntermidiary(id) {
    const newIntermidiaries = intermidiaries.filter(item => item.id !== id);
    setIntermidiaries(newIntermidiaries);
    await apiCall.delete(`/intermidiaries/${id}`);
  }

  function TableHeaderCellEntry(props) {
    return (
      <Table.HeaderCell>
        <h4>{props.title}</h4>
      </Table.HeaderCell>
    )
  }

  return (
    <>
      <Button 
        className="bg-green-400 mt-7 w-2/5" text="Add" 
        onClick={() => navigate("/intermidiaries")} 
      />
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <TableHeaderCellEntry title="Created At" />          
            <TableHeaderCellEntry title="Name" />
            <TableHeaderCellEntry title="Order" />
            <TableHeaderCellEntry title="" />
          </Table.Row>         
        </Table.Header>
        <Table.Body>
        {intermidiaries.map(intermidiary => (        
          <Table.Row key={intermidiary.id}>
            <Table.Cell>{moment(intermidiary.createdAt).format("DD MMMM YYYY h:mm")} CEST</Table.Cell>
            <Table.Cell>{
              <div>
                <p>{intermidiary.intermidiary_order ? intermidiary.intermidiary_order["name"] : ""}: <br />{intermidiary.name}</p>
              </div>}
            </Table.Cell>
            <Table.Cell>{intermidiary.intermidiary_order ? intermidiary.intermidiary_order["id"] : ""}</Table.Cell>
            <Table.Cell>
              <div className="flex items-center justify-around p-5">
                <Button 
                  className="bg-blue-400" text="Edit" 
                  onClick={() => navigate("intermidiaries/" + intermidiary.id)}
                />
                <Button 
                  className="bg-red-400" text="Delete"
                  onClick={() => deleteIntermidiary(intermidiary.id)}  
                />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default IntermidiaryList