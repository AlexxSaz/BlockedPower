<template>
  <div class="container-fluid">
    <header>
      <div class="row no-gutters menu">
        <div class="col-sm">
          <a href="https://so-ups.ru/"><img id="logo" src="../assets/so-logo.png"></a>
          <h1>Расчет невыпускаемого резерва мощности</h1>
        </div>
      </div>
    </header>
    <section class="info" title="Справка">
      <div class="row no-gutters">
        <div class="col-sm">
          <p>
            Существующая методика проведения расчета фактической величины невыпускамемого резерва состоит из нескольких этапов. На первом этапе специалист СДПР по средствам запросов к БД ОИК формирует документы Excel, которые содержат информацию по генерации, потреблению мощности в ОЭС Сибири, а также информацию о перетоках в КС (таблица 1.1). На втором этапе вручную производится перенос информации из сформированных ранее Excel документов в отчетный Excel документ, где будет производиться дальнейший расчет фактической величины невыпускаемеого резерва мощности. Ниже представлены формулы, по которым производится расчет невыпускаемого резерва мощности.
          </p>
          <p>P_резерв=∑_n▒P_уст-∑_n▒P_огран-∑_n▒P_рем-∑_n▒P_ген		(1)</p>
          <p>P_невып=P_резерв+〖(P〗_(МДП-1)-P_(переток-1))-〖(P〗_МДП-P_переток) (2)</p>
          <p>
            где n – количество ЭС, выдача резерва мощности которых ограничена рассматриваемым КС;
            P_резерв – избыток/дефицит мощности в ЭС или группы ЭС;
            P_уст – установленная мощность ЭС или группы ЭС;
            P_огран – ограничение мощности в ЭС или группы ЭС;
            P_рем – суммарная мощность генераторов, выведенных в ремонт в ЭС или в группе ЭС (с учетом ЗРР, ВПР, КС, РЕК);
            P_ген – текущая генерация в ЭС или группы ЭС;
            P_невып – невыпускаемый резерв мощности ЭС или группы ЭС;
            P_МДП – МДП рассматриваемого КС;
            P_переток – текущий переток через рассматриваемое КС.
            На третьем этапе в отчетном Excel документе с использованием формул 1 и 2 производится расчет фактической величины невыпускаемого резерва мощности на час прохождения максимума ОЭС Сибири и час прохождения максимума ЕЭС России.
          </p>
        </div>
      </div>
    </section>
    <div class="row no-gutters calcChoice">
      <div class="col-sm-12">
        <label for="calcType">Выберите вид расчета</label>
        <form class="calcChoice">
          <select name="calcType" id="calcType" @change="onChange($event)">
            <option>-</option>
            <option>Фактический</option>
            <option>Прогнозный</option>
          </select>
        </form>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <section id="factCalc" class="factCalc" v-if="isFactCalcVis">
        <form>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <label for="timeChoice">Введите расчетный час</label>
              <input type="datetime" name="timeChoice" id="timeChoice" placeholder="11.11.20 20:00">
            </div>
          </div>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <label for="sectionChoice">Выберите сечения для расчета</label>
              <select name="sectionChoice" id="sectionChoice" onchange="">
                <option>Кузбасс-Запад</option>
                <option>Назаровское на запад</option>
              </select>
            </div>
          </div>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <label for="systemChoice">Выберите энергосистемы для расчета</label>
              <select name="systemChoice" id="systemChoice" onchange="">
                <option>Забайкальская</option>
                <option>Бурятская</option>
                <option>Иркутская</option>
                <option>Красноярская</option>
                <option>Кузбасская</option>
              </select>
            </div>
          </div>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <input type="button" name="getData" value="Расчет" @click="isFactResultVis = true"> <!-- При нажатии на эту кнопку будут подгружаться данные из БД и производиться расчет -->
            </div>
          </div>
        </form>
        <transition name="fade">
          <section v-if="isFactResultVis">
            <div class="row calcResult">
              <div class="col-sm-12">
                <figure>
                  <img src="img/result_Img.png" title="Графическое представление результата расчета">
                </figure>
              </div>
            </div>
            <div class="row saveCalcResult calcResult">
              <div class="col-sm-9">
                <p>Сумманая величина невыпускаемый резерва мощности равена <span>8000 МВт</span></p>
              </div>
              <div class="col-sm-3">
                <button>Скачать отчет</button>
              </div>
            </div>
          </section>
        </transition>
      </section>
      <section id="forecastCalc" class="forecastCalc" v-if="isForecastCalcVis">
        <form>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <label for="tempChoice">Введите температуру наружного воздуха</label>
              <input type="number" name="tempChoice" id="tempChoice" placeholder="22" min="-50" max="40">
            </div>
          </div>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <label for="forecastSectionChoice">Выберите сечения для расчета</label>
              <select name="forecastSectionChoice" id="forecastSectionChoice" onchange="">
                <option>Кузбасс-Запад</option>
                <option>Назаровское на запад</option>
              </select>
            </div>
          </div>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
              <label for="sectionChoice">Выберите энергосистемы для расчета</label>
              <select name="calcType" id="calcType" onchange="">
                <option>Забайкальская</option>
                <option>Бурятская</option>
                <option>Иркутская</option>
                <option>Красноярская</option>
                <option>Кузбасская</option>
              </select>
            </div>
          </div>
          <div class="row no-gutters calcStart">
            <div class="col-sm-12">
             <input type="button" name="getData" value="Расчет"> <!-- При нажатии на эту кнопку будут подгружаться данные из БД и производиться расчет -->
            </div>
          </div>
        </form>
        <div class="row calcResult">
          <div class="col-sm-12">
            <figure>
             <img src="img/result_Img.png" title="Графическое представление результата расчета">
            </figure>
          </div>
        </div>
        <div class="row saveCalcResult calcResult">
          <div class="col-sm-9">
           <p>Сумманая величина невыпускаемый резерва мощности равена <span>8000 МВт</span></p>
          </div>
          <div class="col-sm-3">
           <button>Скачать отчет</button>
          </div>
        </div>
      </section>
    </transition>
    <footer>
      <div class="row no-gutters authorInfo">
        <div class="col-sm">
          <p>powered by <a href="https://github.com/AlexxSaz">AlexSaz</a>, 2021</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    isFactCalcVis: false,
    isForecastCalcVis: false,
    isFactResultVis: false,
    isForecastResultVis: false
  }),
  methods: {
    onChange(event) {
      if (event.target.value === 'Фактический') {
        this.isFactCalcVis = true
        this.isForecastCalcVis = false
      }
      else if (event.target.value === 'Прогнозный') {
        this.isFactCalcVis = false
        this.isForecastCalcVis = true
      }
      else {
        this.isFactCalcVis = false
        this.isForecastCalcVis = false
      }
    }
  }
}
</script>
