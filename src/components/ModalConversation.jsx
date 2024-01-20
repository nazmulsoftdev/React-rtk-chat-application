import { useEffect, useState } from "react";
import { Modal, Label, TextInput, Textarea, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import validateEmail from "../utils/validateEmail";
import { useGetUserQuery } from "../featured/user/userApi";
import Error from "./UI/Error";
import conversationApi, {
  useAddConversationMutation,
  useEditConversationMutation,
} from "../featured/conversation/conversationApi";
function ModalConversation({ modal, CloseModal }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [checkEmailReady, setCheckEmailReady] = useState(false);
  const [conversation, setConversation] = useState(undefined);
  const auth = useSelector((state) => state.auth);
  const disptach = useDispatch();

  const { email: myEmail } = auth?.user || {};

  const { data: particepent } = useGetUserQuery(to, {
    skip: !checkEmailReady,
  });

  const [addConversation, { isSuccess: isAddConversationSuccess }] =
    useAddConversationMutation();

  const [editConversation, { isSuccess: isEditConversationSuccess }] =
    useEditConversationMutation();

  useEffect(() => {
    if (particepent?.length > 0 && myEmail !== particepent[0].email) {
      disptach(
        conversationApi.endpoints.getConversation.initiate({
          userEmail: myEmail,
          particepentEmail: particepent[0].email,
        })
      )
        .unwrap()
        .then((result) => {
          setConversation(result);
        })
        .catch((err) => {});
    }
  }, [disptach, myEmail, particepent]);

  useEffect(() => {
    if (isAddConversationSuccess || isEditConversationSuccess) {
      CloseModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddConversationSuccess, isEditConversationSuccess]);

  // debounceHandle for email input

  const debounceHandle = (fan, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => fan(...args), delay);
    };
  };

  const doSearch = (value) => {
    if (validateEmail(value)) {
      setCheckEmailReady(true);
      setTo(value);
    }
  };

  // handle modal email input
  const handleModalEmailInput = debounceHandle(doSearch, 500);

  // Modal Form submit handler

  const modalFormSubmitHandler = (e) => {
    e.preventDefault();

    if (conversation?.length > 0) {
      editConversation({
        id: conversation[0].id,
        sender: myEmail,

        data: {
          participants: `${myEmail}-${particepent[0].email}`,
          users: [
            { name: auth.user.name, email: auth.user.email },
            { name: particepent[0].name, email: particepent[0].email },
          ],
          message,
          timestamp: new Date().getTime(),
        },
      });
    } else if (conversation?.length === 0) {
      addConversation({
        sender: myEmail,
        data: {
          participants: `${myEmail}-${particepent[0].email}`,
          users: [
            { name: auth.user.name, email: auth.user.email },
            { name: particepent[0].name, email: particepent[0].email },
          ],
          message,
          timestamp: new Date().getTime(),
        },
      });
    }
  };

  return (
    <>
      <Modal show={modal} onClose={CloseModal} size="md">
        <Modal.Header>Send Message</Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={modalFormSubmitHandler}>
              <div className="flex flex-col space-y-3">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email" />
                  </div>
                  <TextInput
                    id="email1"
                    required
                    type="email"
                    onChange={(e) => handleModalEmailInput(e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Message" value="Message" />
                  </div>
                  <Textarea
                    id="comment"
                    placeholder="Message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Button
                    type="submit"
                    gradientDuoTone="greenToBlue"
                    className="w-full"
                  >
                    Send
                  </Button>
                </div>
                {/* Error Message show here */}
                {particepent?.length === 0 && (
                  <Error Message="Opps this user not found !" />
                )}
                {particepent?.length > 0 && particepent[0].email == myEmail && (
                  <Error Message="you can not send your self" />
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalConversation;
