interface Props {
  label: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
}

export default function QuizOption({ label, emoji, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex items-center gap-2.5 w-full px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all",
        selected
          ? "bg-ruby text-white border-ruby shadow-sm"
          : "bg-white text-gray-800 border-gray-200 hover:border-ruby/50 hover:bg-ruby/5",
      ].join(" ")}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
