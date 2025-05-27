import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

interface ChatMessage {
  sender: string;
  text: string;
  createdAt: string;
}

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const groupMessagesByDate = () => {
    const groups: { [date: string]: ChatMessage[] } = {};
    messages.forEach((msg) => {
      const date = dayjs(msg.createdAt).format('YYYY-MM-DD');
      groups[date] = groups[date] || [];
      groups[date].push(msg);
    });
    return groups;
  };

  const getFriendlyDate = (dateString: string) => {
    const date = dayjs(dateString);
    if (date.isSame(dayjs(), 'day')) return 'Today';
    if (date.isSame(dayjs().subtract(1, 'day'), 'day')) return 'Yesterday';
    return date.format('DD.MM.YYYY');
  };

  const groupedMessages = groupMessagesByDate();

  if (!messages.length) {
    return <div className="text-center text-white/70">Empty</div>;
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="text-center text-sm text-white/50 mb-2">{getFriendlyDate(date)}</div>
          <div className="flex flex-col space-y-2">
            {msgs.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl max-w-[70%] ${
                  msg.sender === 'Bot'
                    ? 'self-start bg-white/20 text-white'
                    : 'self-end bg-emerald-500/40 text-white'
                } backdrop-blur-sm shadow`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {msg.sender === 'You' ? 'You' : msg.sender}
                </div>
                <div className="text-sm">{msg.text}</div>
                <div className="text-[10px] text-right opacity-50 mt-1">
                  {dayjs(msg.createdAt).format('HH:mm')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
