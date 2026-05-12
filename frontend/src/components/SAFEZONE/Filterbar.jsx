import { Layers, AlertTriangle, Shield, Building2 } from "lucide-react";

export default function FilterBar({ activeFilter, onFilterChange, counts }) {
  const filters = [
    { id: "all", label: "All", icon: Layers, color: "bg-gray-700" },
    { id: "danger", label: "Danger", icon: AlertTriangle, color: "bg-red-500" },
    { id: "safe", label: "Safe", icon: Shield, color: "bg-green-500" },
    { id: "police", label: "Police", icon: Building2, color: "bg-blue-500" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-1.5 overflow-x-auto">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;
        const Icon = f.icon;
        return (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all active:scale-95 ${
              isActive
                ? `${f.color} text-white shadow-md`
                : "bg-gray-50 text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={2.5} />
            <span>{f.label}</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-white bg-opacity-25" : "bg-gray-200"
              }`}
            >
              {counts[f.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}