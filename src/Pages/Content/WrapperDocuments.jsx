import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import withNav from '../../Hoc/withNav';
import {
  deleteDocumentAction,
  getDocumentsAction,
} from '../../store/documentSlice';
import { getTypeAction } from '../../store/typeSlice';

function Documents() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [type, setType] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState('');
  const [infoStatus, setInfoStatus] = useState('');
  const [alertInfo, setAlertInfo] = useState(null);
  const [alertDelete, setAlertDelete] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = (id, name) => {
    setSelectedItemId(id);
    setSelectedItemName(name);
    setPopupVisible(true);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteDocumentAction(selectedItemId))
      .then((response) => {
        console.log(response);
        setDeleteStatus('success');
        setAlertDelete('Successfully deleted');
      })
      .catch((error) => {
        setDeleteStatus('error');
        setAlertDelete('Error deleting document');
        console.log(error);
      })
      .finally(() => {
        setPopupVisible(false);
        dispatch(getDocumentsAction())
          .then((dataDocuments) => {
            setData(dataDocuments.payload.data);
          })
          .catch((error) => {
            console.log('Error fetching documents:', error);
          });
      });
  };
  const handleCancelDelete = () => {
    setPopupVisible(false);
    setSelectedItemName(null);
    setSelectedItemId(null);
  };

  const findTypeByID = (id) => type.find((item) => item.id === id);

  const handleSnackbarClose = () => {
    setDeleteStatus('');
    setInfoStatus('');
  };
  const checkLocalStorage = (info) => {
    const document = localStorage.getItem(info);
    if (document === 'true') {
      if (info === 'documentUpdate') {
        setInfoStatus('success');
        setAlertInfo('The document has been updated');
      } else if (info === 'documentCreate') {
        setInfoStatus('success');
        setAlertInfo('The document has been created');
      } else if (document === 'false') {
        if (info === 'documentUpdate') {
          setInfoStatus('error');
          setAlertInfo('Error during document update');
        } else if (info === 'documentCreate') {
          setInfoStatus('error');
          setAlertInfo('Error during document create');
        }
      }
      // eslint-disable-next-line no-undef
      localStorage.removeItem(info);
    }
  };
  useEffect(() => {
    dispatch(getDocumentsAction())
      .then((dataDocuments) => {
        console.log(dataDocuments);
        setData(dataDocuments.payload.data);
        checkLocalStorage('documentUpdate');
        checkLocalStorage('documentCreate');
      })
      .catch((error) => {
        console.log('Error fetching types:', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypeAction())
      .then((dataType) => {
        setType(dataType.payload.data);
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
      <header style={{ display: 'flex' }}>
        <IconButton style={{ color: 'black', marginLeft: 'auto' }}>
          <Link to="/documents/create">
            <AddIcon style={{ fontSize: '45px' }} />
          </Link>
        </IconButton>
      </header>

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Type name</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="right">Updated</TableCell>
              </TableRow>
            </TableHead>
            {data.map((item) => {
              const itemType = findTypeByID(item.typeID);
              const typeName = itemType ? itemType.name : '';
              return (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      style={{ fontWeight: 'bold' }}
                      to={`/documents/${item.id}`}
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{typeName}</TableCell>
                  <TableCell align="right">
                    {new Date(item.created).toLocaleString('en-GB')}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(item.updated).toLocaleString('en-GB')}
                  </TableCell>
                  <IconButton
                    onClick={() => handleDelete(item.id, item.name)}
                    sx={{ color: 'black' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableRow>
              );
            })}
          </Table>
        </TableContainer>
      )}
      <Dialog open={popupVisible} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete {selectedItemName} ?</p>
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
        open={deleteStatus}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={deleteStatus}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {alertDelete}
        </Alert>
      </Snackbar>
      <Snackbar
        open={infoStatus}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={infoStatus}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {alertInfo}
        </Alert>
      </Snackbar>
    </div>
  );
}

const WrapperDocuments = withNav(Documents);

export default WrapperDocuments;
