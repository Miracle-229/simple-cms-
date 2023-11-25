/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import withNav from '../../Hoc/withNav';
import { deleteTypeAction, getTypeAction } from '../../store/typeSlice';

function Types() {
  const [isLoading, setIsLoading] = useState([]);
  const [data, setData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    setSelectedItemId(id);
    setPopupVisible(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTypeAction(selectedItemId))
      .then((response) => {
        setData(data.filter((item) => item.id !== selectedItemId));
        setDeleteStatus(response.payload.success ? 'success' : 'error');
      })
      .catch((error) => {
        setDeleteStatus('error');
        console.log(error);
      })
      .finally(() => {
        setPopupVisible(false);
      });
  };

  const handleCancelDelete = () => {
    setPopupVisible(false);
    setSelectedItemId(null);
  };
  const handleSnackbarClose = () => {
    setDeleteStatus(null);
  };
  useEffect(() => {
    dispatch(getTypeAction())
      .then((dataType) => {
        setData(dataType.payload.data);
      })
      .catch((error) => {
        console.log('Error fetching types:', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <List>
          {data.map((item) => (
            <ListItem key={item.id} disableGutters>
              <Link to={`/types/${item.slug}`}>
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
              <IconButton
                onClick={() => handleDelete(item.id, item.name)}
                sx={{ color: 'black' }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Dialog open={popupVisible} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete?</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleCancelDelete}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={deleteStatus === 'success'}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={handleSnackbarClose}
        >
          Successfully deleted.
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteStatus === 'error'}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error" variant="filled" onClose={handleSnackbarClose}>
          Error deleting document.
        </Alert>
      </Snackbar>
    </div>
  );
}

const WrapperTypes = withNav(Types);

export default WrapperTypes;
