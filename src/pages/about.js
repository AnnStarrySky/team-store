export function renderAbout() {
  const section = document.createElement('section')
  section.innerHTML = `
    <section class="hero" style="--hero-image: url('${import.meta.env.BASE_URL}images/bg-1.png')">
      <div class="hero__content">
        <h1 class="hero__title">Всё для счастливой жизни вашей кошки</h1>
        <p class="hero__subtitle">Игрушки, уход и питание в одном месте</p>
      </div>
    </section>

    <section class="about">
      <h2>Добро пожаловать в CatHome!</h2>
      <p>
        CatHome — это учебный командный проект интернет-магазина для кошек. Здесь можно выбрать игрушки, товары для ухода и питание, отфильтровать каталог по цене и категории, а затем собрать корзину и рассчитать итоговую стоимость с учётом промокода.
      </p>
      <h3>Наша команда:</h3>
      <ul class="about-list">
        <li>
          <a href="https://github.com/aliaksandr-kiziankou" target="_blank" rel="noopener noreferrer">aliaksandr-kiziankou</a>
        </li>
        <li>
          <a href="https://github.com/AnnStarrySky" target="_blank" rel="noopener noreferrer">AnnStarrySky</a>
        </li>
      </ul>
    </section>

    <section class="promo" style="--promo-image: url('${import.meta.env.BASE_URL}images/bg-2.png')">
      <div class="promo__content">
        <h2 class="promo__text">Забота, комфорт и много любви ❤️</h2>
      </div>
    </section>
  `
  return section
}
