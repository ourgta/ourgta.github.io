function index() {
  const weight = document.getElementById("weight").value;

  if (isNaN(weight)) return;

  const powder = document.getElementById("powder").value | 50;
  const powderWeight = document.getElementById("powderWeight").value | 65;
  const powderVolume = document.getElementById("powderVolume").value | 97;
  const powderLoad = document.getElementById("powderLoad").value | 5;

  if (isNaN(powder)) return;
  if (isNaN(powderWeight)) return;
  if (isNaN(powderVolume)) return;
  if (isNaN(powderLoad)) return;

  const powderRatio = powderWeight / powderVolume;
  const load = weight / powderLoad;
  const grams = powder * powderRatio * load;
  document.getElementById("grams").value = grams;
}
