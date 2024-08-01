// dataStorage.js
export const loadData = async () => {
  if (window.api) {
    return await window.api.loadData();
  } else {
    console.error('API is not available');
    return [];
  }
};

export const saveData = async (data) => {
  if (window.api) {
    await window.api.saveData(data);
  } else {
    console.error('API is not available');
  }
};
