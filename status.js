async function loadStatus() {
  const panel = document.getElementById("status-panel");

  if (!panel) return;

  try {
    const response = await fetch("status.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load status: ${response.status}`);
    }

    const status = await response.json();

    const fields = [
      ["Portfolio", status.portfolio],
      ["Main Project", status.main_project],
      ["Secondary Project", status.secondary_project],
      ["Annos Status", status.annos_status],
      ["Flowback Status", status.flowback_status],
      ["Build Status", status.build_status],
      ["Security Focus", String(status.security_focus)],
      ["Last Updated", status.last_updated],
    ];

    panel.innerHTML = fields
      .map(
        ([label, value]) => `
          <div>
            <dt>${label}</dt>
            <dd>${value}</dd>
          </div>
        `
      )
      .join("");
  } catch (error) {
    panel.innerHTML = `
      <div>
        <dt>Status Error</dt>
        <dd>${error instanceof Error ? error.message : "Unknown error"}</dd>
      </div>
    `;
  }
}

loadStatus();
