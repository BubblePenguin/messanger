import getConversationById from "@/app/actions/getConversationByid";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import { AppProps } from "next/app";

interface AppOwnProps {
  params: {
    conversationId: string;
  };
}

const ConversationId: React.FC<AppProps & AppOwnProps> = async ({ params }) => {
  const { conversationId } = params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation)
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation}></Header>
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
