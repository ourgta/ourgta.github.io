(async () => {
  const params = new URLSearchParams(document.location.search);
  const sid = params.get("sid");

  if (!sid) return;

  const players = new Array();

  for (const {
    attributes: { name },
    attributes: { id: pid },
  } of (
    await (
      await fetch(`https://api.battlemetrics.com/servers/${sid}?include=player`)
    ).json()
  ).included) {
    players.push({
      name,
      pid: pid,
      online: true,
    });
  }

  const stop = new Date();
  const start = new Date(stop.getTime() - 30 * 60 * 1000);

  for (const {
    attributes: { name },
    relationships: {
      player: {
        data: { id: pid },
      },
    },
  } of (
    await (
      await fetch(
        `https://api.battlemetrics.com/servers/${sid}/relationships/sessions?start=${start.toISOString()}&stop=${stop.toISOString()}`
      )
    ).json()
  ).data) {
    if (players.find((e) => e.pid === pid)) continue;

    players.push({
      name,
      pid: pid,
      online: false,
    });
  }

  const hidden = (await (await fetch("/config.json")).json()).hidden;
  const list = document.getElementById("players");

  for (const player of players.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    })
  )) {
    if (
      hidden.includes(
        new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" })
          .update(player.pid)
          .getHash("HEX")
      )
    )
      continue;

    const anchor = document.createElement("a");
    anchor.href = `/player.html?pid=${player.pid}`;
    anchor.appendChild(document.createTextNode(player.name));

    if (!player.online) anchor.classList.add("offline");

    const listItem = document.createElement("li");
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  }

  document.getElementById("loading").style.display = "none";
})();
