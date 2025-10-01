"use client"

import RecipeForm from "@/app/form/recipes.form"

export default function NewRecipePage(){
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-3xl font-bold mb-4">Create new recipe</h1>
            <RecipeForm/>
        </div>
    )
}