export function formatOptions(array) {
  const values = array.map((item) => item.value);
  const result = values.join(", ");
  return result;
}

export function convertStringToObjectArray(inputString) {
  const labelsArray = inputString.split(',').map(label => label.trim());

  const outputArray = labelsArray.map(label => {
    return {
      label,
      value: label
    };
  });

  return outputArray;
}