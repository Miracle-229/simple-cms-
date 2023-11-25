const express = require('express')
const {
  wrapGetListDataMethod,
  wrapDeleteDataMethod,
  wrapAddDataMethod,
  wrapUpdateMethod,
  wrapGetElementMethod,
} = require('./utils');
const { types, documents } = require('./dataModel');


const createCRUD = (data) => {
  const router = express.Router({
    caseSensitive: true,
  });
  const getList = wrapGetListDataMethod(data);
  const deleteItem = wrapDeleteDataMethod(data);
  const addItem = wrapAddDataMethod(data);
  const updateItem = wrapUpdateMethod(data);
  const getItem = wrapGetElementMethod(data);
  router.get('/', async (req, res) => {
    res.json(await getList());
  });

  router.post('/', async (req, res) => {
    res.json(await addItem(req.body));
  });
  router.put('/:id', async (req, res) => {
    res.json(await updateItem(req.params.id, req.body));
  });

  router.get('/:id', async (req, res) => {
    res.json(await getItem(req.params.id));
  });
  router.delete('/:id', async (req, res) => {
    res.json(await deleteItem(req.params.id));
  });

  return router;
};
const router = express.Router({
  caseSensitive: true,
});

router.use('/documents', createCRUD(documents));
router.use('/types', createCRUD(types));

module.exports = router;

