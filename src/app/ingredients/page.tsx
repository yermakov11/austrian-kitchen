'use client'

import IngredientsTable from "@/components/UI/tabels/Ingredients";
import IngredientForm from "../form/ingredient.from";


export default function IngredientsPage() {
  return (
    <div>
       <IngredientForm />
       <IngredientsTable/>
    </div>
    
  )
}
