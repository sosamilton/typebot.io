import { createBlock } from "@typebot.io/forge";
import { addLabels } from "./actions/addLabels";
import { assignConversation } from "./actions/assignConversation";
import { createLead } from "./actions/createLead";
import { handoffToHuman } from "./actions/handoffToHuman";
import { searchContact } from "./actions/searchContact";
import { sendMessage } from "./actions/sendMessage";
import { sendPrivateNote } from "./actions/sendPrivateNote";
import { setPriority } from "./actions/setPriority";
import { setStatus } from "./actions/setStatus";
import { updateContact } from "./actions/updateContact";
import { updateCustomAttributes } from "./actions/updateCustomAttributes";
import { auth } from "./auth";
import { EvoCrmDarkLogo, EvoCrmLogo } from "./logo";

export const evoCrmBlock = createBlock({
  id: "evo-crm",
  name: "Evo CRM",
  tags: ["crm", "support", "live chat"],
  LightLogo: EvoCrmLogo,
  DarkLogo: EvoCrmDarkLogo,
  auth,
  actions: [
    setStatus,
    addLabels,
    setPriority,
    assignConversation,
    updateCustomAttributes,
    sendMessage,
    sendPrivateNote,
    handoffToHuman,
    searchContact,
    updateContact,
    createLead,
  ],
});
