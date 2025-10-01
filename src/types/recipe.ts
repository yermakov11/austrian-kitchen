import { IIngredient } from "./ingredient";

export interface RecipeIngredient {
    id: string;
    ingredientId: string;
    quantity: number;
    ingredient: IIngredient;
}


export interface IRecipe {
    id: string;
    name: string;
    description: string;
    image_url: string | null;
    ingredients: RecipeIngredient[];
}