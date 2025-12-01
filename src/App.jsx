import { useState, useEffect } from "react";

export default function App() {
  // Загружаем задачи из localStorage при первом запуске
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");

  // Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed },
    ]);
    setInput("");
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        background: "#ffffff",
      }}
    >
      <h1 style={{ marginBottom: 4 }}>To-Do List</h1>
      <p style={{ marginTop: 0, marginBottom: 20, color: "#666" }}>
        Простое приложение для управления задачами. Данные сохраняются в браузере.
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderRadius: 6,
            fontSize: 14,
          }}
          placeholder="Новая задача..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 16px",
            background: "#4a77ff",
            border: "none",
            color: "#fff",
            borderRadius: 6,
            fontSize: 14,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Добавить
        </button>
      </div>

      <ul style={{ marginTop: 20, padding: 0, listStyle: "none" }}>
        {tasks.length === 0 && (
          <li style={{ color: "#888", fontSize: 14 }}>
            Пока задач нет. Добавьте первую.
          </li>
        )}

        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              padding: "10px 12px",
              background: "#f7f7f7",
              borderRadius: 6,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 14,
            }}
          >
            <span>{t.text}</span>
            <button
              onClick={() => removeTask(t.id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#d9534f",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
