import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
  const prompts = [
    "How did Taylor become Time's Person of the Year? 🎤",
    "What is Taylor's net worth? 💰",
    "What were the surprise songs in Chicago? 🤯",
    "How many Grammy Awards has Taylor won? 🏆",
  ];

  return (
    <div className="flex flex-row flex-wrap justify-center items-center py-4 gap-2 z-10">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton key={`suggestion-${index}`} text={prompt} onClick={() => onPromptClick(prompt)} />
      ))}
    </div>
  );
};

export default PromptSuggestionRow;
