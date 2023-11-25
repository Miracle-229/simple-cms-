import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  getDocumentAction,
  updateDocumentAction,
} from '../../store/documentSlice';
import { getTypeAction } from '../../store/typeSlice';
import withNav from '../../Hoc/withNav';

function DocumentsId() {
  const { documentID } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // New state variable
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDocumentAction(documentID))
      .then((data) => {
        const document = data.payload;
        setValue('title', document.title);
        setValue('type', document.typeID);
        setSelectedType(document.typeID); // Set selected type in the state
      })
      .catch((error) => {
        console.log('Error fetching document:', error);
      });

    dispatch(getTypeAction())
      .then((data) => {
        setTypes(data.payload.data);
      })
      .catch((error) => {
        console.log('Error fetching types:', error);
      });
  }, [dispatch, documentID, setValue]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value);
    setSelectedType(value);
  };

  const handleUpdate = (data) => {
    const payload = {
      id: documentID,
      title: data.title,
      typeID: data.type,
    };
    dispatch(updateDocumentAction({ id: documentID, payload }))
      .then(() => {
        localStorage.setItem('documentUpdate', true);
        navigate('/documents');
      })
      .catch((error) => {
        console.log('Error updating item:', error);
        localStorage.setItem('documentUpdate', false);
        navigate('/documents');
      });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <TextField type="text" {...register('title')} placeholder="Title" />
      <br />
      <br />
      <FormControl sx={{ minWidth: '210px' }}>
        <Select
          {...register('type')}
          value={selectedType} // Use selectedType as the value
          onChange={handleChange}
          sx={{ minWidth: '210px' }}
        >
          {types.map((type) => (
            <MenuItem key={type.slug} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Button sx={{ minWidth: '210px' }} variant="contained" type="submit">
        Update
      </Button>
    </form>
  );
}
const WrapperDocumentsID = withNav(DocumentsId);

export default WrapperDocumentsID;
