<template>
  <section id="factCalc" class="calc">
    <form @submit.prevent="submitHandler">
      <div class="row no-gutters calcStart">
        <div class="col-sm-12">
          <label for="timeChoice">Введите расчетный час</label>
          <input type="datetime" name="timeChoice" id="timeChoice" class=""
          :placeholder="calcDate | date('datetime')"
          v-model="calcDateValue" :class="{invalid: ($v.calcDateValue.$dirty && !$v.calcDateValue.required)}"
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
           <input type="submit" name="getData" value="Расчет"> <!-- При нажатии на эту кнопку будут подгружаться данные из БД и производиться расчет -->
        </div>
      </div>
     </form>
     <transition name="fade">
       <section v-if="isFactResultVis">
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
    isFactResultVis: false,
    calcDate: new Date(),
    calcDateValue: ''
  }),
  validations: {
    calcDateValue: {required}
  },
  methods: {
    submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.isFactResultVis = true
    }
  }
}
</script>
