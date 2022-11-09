(async () => {
  const params = new URLSearchParams(document.location.search);
  const pid = params.get("pid");

  if (!pid) {
    return;
  }

  const hidden = (await (await fetch("/config.json")).json()).hidden;

  const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
  shaObj.update(pid);
  if (hidden.includes(shaObj.getHash("HEX"))) {
    location.href = "https://youtu.be/dQw4w9WgXcQ";
    return;
  }

  const response = await fetch(
    `https://api.battlemetrics.com/players/${pid}?include=identifier`
  );
  const data = await response.json();

  const list = document.getElementById("names");

  for (const id of data.included) {
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(id.attributes.identifier));
    list.appendChild(listItem);
  }
})();
