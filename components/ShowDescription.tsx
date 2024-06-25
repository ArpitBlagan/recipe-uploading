import ReactMarkdown from "react-markdown";

const ShowDescription = ({ description }: any) => {
  return (
    <div
      className="prose prose-md dark:prose-gray dark:prose-h2:text-gray-200 dark:prose-h4:text-gray-200 
    "
    >
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default ShowDescription;
