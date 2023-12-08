import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
  const prompts = [
    "How did Taylor become 2023 Time's Person of the Year?",
    'Where is the next stop on the Eras Tour?',
    'What was the last Chiefs game Taylor attended?',
    "How many Grammy Awards has Taylor won?",
  ];

  return (
    <div className="flex flex-row flex-wrap justify-start items-center py-4 gap-2">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton key={`suggestion-${index}`} text={prompt} onClick={() => onPromptClick(prompt)} />
      ))}
    </div>
  );
};

export default PromptSuggestionRow;
