// TODO: add types for array - object with requuired "id" property, and any other properties
export const idGenerator = (array: any): number => {
  const idArray: number[] = array.map((item: any) => +item.id);
  const sortedIdArray = idArray.sort((a, b) => b - a);
  const newId = sortedIdArray[0] + 1;
  return newId;
};
