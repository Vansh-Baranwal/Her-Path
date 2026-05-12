function SafetyScoreBadge({ score, size = "md" }) {
  const getColor = () => {
    if (score >= 80) return { bg: "bg-green-500", text: "Safe", emoji: "✅" };
    if (score >= 60)
      return { bg: "bg-amber-500", text: "Okay", emoji: "⚠️" };
    return { bg: "bg-red-500", text: "Risky", emoji: "⛔" };
  };

  const { bg, text, emoji } = getColor();
  const sizes = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${bg} text-white font-bold rounded-full shadow-md ${sizes[size]}`}
    >
      <span>{emoji}</span>
      <span>{text}</span>
      <span className="bg-white bg-opacity-25 rounded-full px-1.5 py-0.5">
        {score}%
      </span>
    </div>
  );
}

export default SafetyScoreBadge;