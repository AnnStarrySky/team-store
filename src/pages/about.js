export function renderAbout() {
  const section = document.createElement('section')
  section.innerHTML = `
    <h1>О нашем магазине</h1>
    <p>Добро пожаловать в Team Store!</p>
    <h2>Наша команда:</h2>
    <ul>
      <li>aliaksandr-kiziankou</li>
      <li>AnnStarrySky</li>
    </ul>
  `
  return section
}
