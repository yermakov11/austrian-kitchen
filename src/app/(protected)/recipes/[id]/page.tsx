"use client"

import RecipeForm from "@/app/form/recipes.form";
import { useRecipeStore } from "@/store/recipe.store";
import { IRecipe } from "@/types/recipe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const EditRecipePage = () => {

    const { id } = useParams<{id: string}>();
    const {recipes, isLoading, error} = useRecipeStore();
    const [recipe, setRecipe ] = useState<IRecipe|null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(()=>{
        if(recipes.length > 0 || error){
            const foundRecipe = recipes.find((r)=>r.id === id);
            setRecipe(foundRecipe || null);
            setHasSearched(true);
        }
    }, [recipes, id, error])

    if(isLoading) return <p className="text-center">Loading...</p>;
    if(error) return <p className = "text-red-500 text-center">{error}</p>

    if(hasSearched && !recipe){
        return <p className="text-red-500 text-center">Recipe not found</p>
    }

    if(recipe){
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-center text-3xl font-bold md-4">
                    Edit recipe : {recipe.name}
                </h1>
                <RecipeForm initialRecipe={recipe}/>
            </div>
        )
    }
    return <p className="text-center">Loading...</p>    
}

export default EditRecipePage;