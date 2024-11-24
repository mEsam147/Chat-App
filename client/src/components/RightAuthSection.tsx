type Props = {
  title: string;
  content: string;
};
const RightAuthSection = ({ title, content }:Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 max-w-lg mx-auto ">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`max-w-40 h-[130px] rounded-md bg-secondary duration-100 m-1 ${
              i % 2 === 0 ? "animate-pulse bg-primary" : ""
            } `}
          ></div>
        ))}
      </div>
      <div className="my-4">
        <p className="text-yellow-300/50 text-xl font-bold text-center">{title}</p>
        <span className="text-yellow-300/50 text-sm leading-5 font-bold text-center">
          {content}
        </span>
      </div>
    </div>
  );
};

export default RightAuthSection;
