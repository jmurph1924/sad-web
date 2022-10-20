import { useSelector } from "react-redux";
//
const selectIsModalVisible = (state) => state?.login?.isModalVisible ?? false;

//SelectIsModalVisible Function Export
export const useSelectIsModalVisible = () => {
  return {
    visible: useSelector(selectIsModalVisible),
  };
};
