(async () => {
  const hello = "Hello world!";
  console.log(hello);

  const params = new URLSearchParams(document.location.search);
  const sid = params.get("sid");

  if (!sid) {
    return;
  }

  const response = await fetch(
    `https://api.battlemetrics.com/servers/${sid}?include=player`
  );
  const data = await response.json();

  const list = document.getElementById("players");

  for (const player of data.included) {
    const anchor = document.createElement("a");
    anchor.href = `/player.html?pid=${player.attributes.id}`;
    anchor.appendChild(document.createTextNode(player.attributes.name));

    const listItem = document.createElement("li");
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  }
})();
