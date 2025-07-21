const data = ["Apple", "Banana", "Cherry", "Date", "Grape", "Orange"];
const search = document.getElementById('search');
const results = document.getElementById('results');

search.oninput = function() {
  const v = search.value.toLowerCase();
  results.innerHTML = data
    .filter(item => item.toLowerCase().includes(v))
    .map(item => `<li>${item}</li>`)
    .join('');
};