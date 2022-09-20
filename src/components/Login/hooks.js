import { useSelector } from "react-redux";

const selectIsModalVisible = (state) => state?.login?.isModalVisible ?? false;

export const useSelectIsModalVisible = () => {
  return {
    visible: useSelector(selectIsModalVisible),
  };
};
