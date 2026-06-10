import { addLabelsHandler } from "./handlers/addLabelsHandler";
import { assignConversationHandler } from "./handlers/assignConversationHandler";
import { createLeadHandler } from "./handlers/createLeadHandler";
import { handoffToHumanHandler } from "./handlers/handoffToHumanHandler";
import { searchContactHandler } from "./handlers/searchContactHandler";
import { sendMessageHandler } from "./handlers/sendMessageHandler";
import { sendPrivateNoteHandler } from "./handlers/sendPrivateNoteHandler";
import { setPriorityHandler } from "./handlers/setPriorityHandler";
import { setStatusHandler } from "./handlers/setStatusHandler";
import { updateContactHandler } from "./handlers/updateContactHandler";
import { updateCustomAttributesHandler } from "./handlers/updateCustomAttributesHandler";

export default [
  setStatusHandler,
  addLabelsHandler,
  setPriorityHandler,
  assignConversationHandler,
  updateCustomAttributesHandler,
  sendMessageHandler,
  sendPrivateNoteHandler,
  handoffToHumanHandler,
  searchContactHandler,
  updateContactHandler,
  createLeadHandler,
];
