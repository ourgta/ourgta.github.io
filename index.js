(async () => {
  const hello = "Hello world!";
  console.log(hello);

  const servers = [19736, 397528];

  const list = document.getElementById("servers");

  for (const sid of servers) {
    const response = await fetch(
      `https://api.battlemetrics.com/servers/${sid}`
    );
    const data = await response.json();

    const serverName = data.data.attributes.name;

    if (serverName === null) {
      continue;
    }

    const anchor = document.createElement("a");
    anchor.href = `/server.html?sid=${sid}`;
    anchor.appendChild(document.createTextNode(serverName));

    const listItem = document.createElement("li");
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  }
})();
