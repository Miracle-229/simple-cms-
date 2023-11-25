import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getTypeAction } from '../../store/typeSlice';
import { addItemAction } from '../../store/documentSlice';
import withNav from '../../Hoc/withNav';

function Create() {
  const { register, handleSubmit } = useForm();
  const [types, setTypes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTypeAction())
      .then((data) => {
        setTypes(data.payload.data);
      })
      .catch((error) => {
        console.log('Error fetching types:', error);
      })
      .finally(() => {});
  }, [dispatch]);

  const handleCreate = (data) => {
    const payload = {
      title: data.title,
      typeID: data.type,
    };

    dispatch(addItemAction(payload))
      .then(() => {
        localStorage.setItem('documentCreate', true);
        navigate('/documents');
      })
      .catch((error) => {
        console.log('Error adding item:', error);
        localStorage.setItem('documentCreate', false);
        navigate('/documents');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreate)}>
        <TextField
          id="outlined-basic"
          label="Title"
          {...register('title')}
          variant="outlined"
        />
        <br />
        <br />
        <FormControl sx={{ minWidth: '210px' }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            {...register('type')}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="type"
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
        <Button sx={{ minWidth: '210px' }} type="submit" variant="contained">
          Create
        </Button>
      </form>
    </div>
  );
}

const WrapperCreate = withNav(Create);
export default WrapperCreate;
