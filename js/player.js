(async () => {
  const params = new URLSearchParams(document.location.search);
  const pid = params.get("pid");

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
