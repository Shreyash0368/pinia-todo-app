export const useModal = () => {
  const isOpen = useState("modalOpen", () => false);
  const updateId = useState("updateId", () => "");

  const openModal = () => {
    isOpen.value = true;
  };

  const setId = (id = "") => {
    updateId.value = id;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    updateId,
    openModal,
    closeModal,
    toggleModal,
    setId,
  };
};
