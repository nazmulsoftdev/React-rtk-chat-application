import { useState } from "react";
import ChatItem from "./ChatItem";
import { BiSolidMessageEdit as NewConversationIcon } from "react-icons/bi";
import { Tooltip } from "flowbite-react";
import ModalConversation from "../ModalConversation";
function Sidebar() {
  const [modal, setModal] = useState(false);

  // Open Modal Conversation

  const OpenModal = () => {
    setModal(true);
  };

  // Close Modal Conversation

  const CloseModal = () => {
    setModal(false);
  };

  return (
    <>
      <div>
        <div className="p-2 flex justify-end items-center">
          <Tooltip content="New Conversation" placement="left">
            <NewConversationIcon
              onClick={OpenModal}
              size={25}
              className="cursor-pointer"
              color="#487eb0"
            />
          </Tooltip>
        </div>
        <ChatItem />
      </div>
      <ModalConversation modal={modal} CloseModal={CloseModal} />
    </>
  );
}

export default Sidebar;
