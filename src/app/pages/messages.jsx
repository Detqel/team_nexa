import { useMemo, useState } from "react";
import { Search, Send } from "lucide-react";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const initialConversations = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Instructor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    unread: 2,
    lastMessage: "Please upload the final project documents.",
    lastTime: "10:42 AM",
    messages: [
      { from: "them", text: "Hi, can you share your final project draft?", time: "10:15 AM" },
      { from: "me", text: "Yes, I'll upload it before noon.", time: "10:18 AM" },
      { from: "them", text: "Great, thanks!", time: "10:42 AM" },
    ],
  },
  {
    id: 2,
    name: "Course Support",
    role: "System",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=support",
    unread: 0,
    lastMessage: "Your quiz score is now available.",
    lastTime: "Yesterday",
    messages: [
      { from: "them", text: "Your quiz score has been published.", time: "Yesterday" },
    ],
  },
];

export function MessagesPage() {
  const [conversationsState, setConversationsState] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0].id);
  const [messageInput, setMessageInput] = useState("");

  const selectedConversation = useMemo(
    () => conversationsState.find((c) => c.id === selectedId) ?? conversationsState[0],
    [conversationsState, selectedId],
  );

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = messageInput.trim();
    if (!message) return;

    setConversationsState((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              lastMessage: message,
              lastTime: "Now",
              unread: 0,
              messages: [...conversation.messages, { from: "me", text: message, time: "Now" }],
            }
          : conversation,
      ),
    );
    setMessageInput("");
  };

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Messages"
        description="Continue your conversation with instructors and support."
      />

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <Card className="overflow-hidden">
          <CardHeader className="flex items-center justify-between gap-3 px-6 py-5">
            <div>
              <CardTitle>Conversations</CardTitle>
              <p className="text-sm text-muted-foreground">Latest chats and unread messages.</p>
            </div>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </CardHeader>
          <CardContent className="space-y-2 px-0 py-4">
            {conversationsState.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => setSelectedId(conversation.id)}
                className={`flex w-full items-center gap-3 border-b px-6 py-4 text-left transition hover:bg-muted ${
                  conversation.id === selectedId ? "bg-muted/50" : ""
                }`}
              >
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>{conversation.name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{conversation.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{conversation.lastTime}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && <Badge variant="secondary">{conversation.unread}</Badge>}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="flex min-h-[520px] flex-col">
          <CardHeader className="px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Active conversation</p>
                <h2 className="text-xl font-semibold">{selectedConversation?.name}</h2>
              </div>
              <Badge variant="outline">{selectedConversation?.role}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-6 px-6 py-4">
            <div className="flex-1 space-y-4 overflow-auto pr-2">
              {selectedConversation?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 max-w-[85%] ${
                    message.from === "me"
                      ? "self-end ml-auto bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground"
                  }`}
                >
                  <p className="text-sm leading-6">{message.text}</p>
                  <p className="mt-2 text-xs opacity-70">{message.time}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="space-y-3">
              <Textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Write a message..."
                className="min-h-[100px]"
              />
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">Send a quick reply.</span>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </StudentDashboardLayout>
  );
}

export default MessagesPage;
