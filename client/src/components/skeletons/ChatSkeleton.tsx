const ChatSkeleton = () => {
  const mockSkeletonArray = Array.from({ length: 8 });

  return (
    <div>
      {mockSkeletonArray.map((_, i) => (
        <div
          className={`chat ${
            i % 2 === 0 ? "chat-start" : "chat-end"
          }  space-y-3`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full skeleton " />
          </div>
          <div className="chat-bubble skeleton w-1/3 h-10" />
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
