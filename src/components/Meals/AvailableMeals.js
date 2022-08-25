import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import Mealtem from "./MealItem/MealItem";
import {useState , useEffect} from "react"

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 400,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 300,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 450,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 299,
//   },
// ];



const AvailableMeals = () => {

  const [meals , setMeals] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [httpError , setHttpError] = useState();


  useEffect(() => {
    const fetchMeals = async() => {
      setIsLoading(true);
      const response = await fetch("https://food-order-app-35450-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json");

      if(!response.ok){
        throw new Error("something went wrong")
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description : responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    }
    fetchMeals().catch(error => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  } ,[])

  if(isLoading){
    return <div className={classes.mealsLoading}>
      <p>Loading...</p>
    </div>
  }

  if(httpError){
    return <div className={classes.mealsError}><p>{httpError}</p></div>
  }


  const mealsList = meals.map((meal) => (
    <Mealtem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
