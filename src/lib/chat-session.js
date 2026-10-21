// Kept in memory by ChatPanel's shared module, never written to browser storage.
export function createChatSession(request, { timeout = 45000 } = {}) {
  let state = { messages: [], draft: "", status: "idle", lastPrompt: null };
  let active = null;
  let sequence = 0;
  const listeners = new Set();
  const update = (patch) => { state = { ...state, ...patch }; listeners.forEach((listener) => listener()); };

  async function send(text, context, retry = false) {
    text = text.trim();
    if (!text || state.status === "loading") return;
    const history = retry ? state.messages.slice(0, -1) : state.messages;
    const user = retry ? state.messages.at(-1) : { id: ++sequence, role: "user", text };
    const task = { controller: new AbortController() };
    active = task;
    task.timer = setTimeout(() => { if (active === task) { active = null; task.controller.abort(); update({ status: "error" }); } }, timeout);
    update({ messages: retry ? state.messages : [...state.messages, user], draft: retry ? state.draft : "", status: "loading", lastPrompt: { text, context, id: user.id } });
    try {
      const reply = await request(text, history, context.language, context.page, task.controller.signal);
      if (active !== task || task.controller.signal.aborted) return;
      if (typeof reply !== "string" || !reply.trim()) throw new Error("Empty response");
      update({ messages: [...state.messages, { id: ++sequence, role: "assistant", text: reply }], status: "idle", lastPrompt: null });
    } catch {
      if (active === task) update({ status: "error" });
    } finally { clearTimeout(task.timer); if (active === task) active = null; }
  }
  return {
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    getSnapshot: () => state,
    setDraft(draft) { update({ draft }); },
    send,
    retry(context) {
      if (state.lastPrompt && state.messages.at(-1)?.id === state.lastPrompt.id) return send(state.lastPrompt.text, context ?? state.lastPrompt.context, true);
    },
    stop() { if (!active) return; clearTimeout(active.timer); active.controller.abort(); active = null; update({ status: "stopped" }); },
    reset() { if (active) { clearTimeout(active.timer); active.controller.abort(); } active = null; update({ messages: [], draft: "", status: "idle", lastPrompt: null }); },
  };
}
