<template>
  <section id="forecastCalc" class="calc">
    <form @submit.prevent="submitHandler">
        <div class="row no-gutters calcStart">
          <div class="col-sm-12">
            <label for="tempChoice">Введите температуру наружного воздуха</label>
            <input type="number" name="tempChoice" id="tempChoice" placeholder="22" min="-50" max="40"
              v-model="calcTempValue" :class="{invalid: ($v.calcTempValue.$dirty && !$v.calcTempValue.required)}"
            >
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
            <label for="genChoice">Выберите генераторы для расчета</label>
            <select name="genChoice" id="genChoice" onchange="">
              <option>Саяно-Шушенская ГЭС Г1</option>
              <option>Саяно-Шушенская ГЭС Г2</option>
              <option>Саяно-Шушенская ГЭС Г3</option>
              <option>Саяно-Шушенская ГЭС Г4</option>
              <option>Саяно-Шушенская ГЭС Г5</option>
              <option>Красноярская ГЭС Г1</option>
              <option>Красноярская ГЭС Г2</option>
              <option>Красноярская ГЭС Г3</option>
              <option>Красноярская ГЭС Г4</option>
              <option>Красноярская ГЭС Г5</option>
            </select>
          </div>
        </div>
        <div class="row no-gutters calcStart">
          <div class="col-sm-12">
           <input type="submit" name="getData" value="Расчет"> <!-- При нажатии на эту кнопку будут подгружаться данные из БД и производиться расчет -->
          </div>
        </div>
      </form>
   <transition name="fade">
     <section v-if="isForecastResultVis">
       <div class="row calcResult">
        <div class="col-sm-12">
          <figure id="resultFig">
            <img src="../assets/Result.png" title="Графическое представление результата расчета">
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
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    isForecastResultVis: false,
    calcTempValue: ''
  }),
  validations: {
    calcTempValue: {required}
  },
  methods: {
    submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        calcTempValue: this.calcTempValue
      }

      console.log(formData)
      this.isForecastResultVis = true
    }
  }
}
</script>
