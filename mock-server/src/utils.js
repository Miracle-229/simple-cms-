const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('./errors');

const wait = (time) => {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
};


const wrapGetListDataMethod = (data) => {
  return () => {
    return new Promise((resolve) => setTimeout(() => resolve(data), 500));
  };
};

const wrapDeleteDataMethod = (data) => {
  return async (id) => {
    await wait(500);

    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      return { success: true };
    } else {
      throw new NotFoundError();
    }
  };
};

const wrapAddDataMethod = (data) => {
  return async (item) => {
    await wait(500);

    item.id = uuidv4();
    item.created = new Date().toISOString();
    item.updated = new Date().toISOString();
    data.push(item);

    return item;
  };
};

const wrapUpdateMethod = (data) => {
  return async (id, updatedItem) => {
    await wait(500);
    updatedItem.updated = new Date().toISOString();
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedElement = { ...data[index], ...updatedItem };
      data[index] = updatedElement;
      return updatedElement;
    } else {
      throw new NotFoundError();
    }
  };
};

const wrapGetElementMethod = (data) => {
  return async (id) => {
    await wait(500);
    const item = data.find((item) => item.id === id);
    if (item) {
      return item;
    } else {
      throw new NotFoundError();
    }
  };
};
module.exports = {
  wrapGetListDataMethod,
  wrapDeleteDataMethod,
  wrapAddDataMethod,
  wrapUpdateMethod,
  wrapGetElementMethod,
  wait,
};

