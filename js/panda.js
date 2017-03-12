// hungryPanda example
const hungryPanda = {
  // key/value pairs act as global scope variables for their parent object, and can be referenced by the object's methods
  foodAmount: 0,
  mealSize: 0,
  totalFed: 0,
  date: Date.now(),
  feedPanda() {
    if (this.foodAmount >= this.mealSize) {
      // decrement foodAmount by mealSize
      this.foodAmount -= this.mealSize;
      // increment totalFed by mealSize
      this.totalFed += this.mealSize;
    } else {
      // not enough food!
    }
    // Updates date value to the date the panda was fed
    this.date = Date.now();
  },
  getValues() {
    console.log(this.foodAmount, this.mealSize, this.totalFed);
  },
  // sets the groundwork for the full object. here we are setting initial values for foodAmount and mealSize
  init(totalFood, eachMeal) {
    this.foodAmount = totalFood;
    this.mealSize = eachMeal;
  }
}
