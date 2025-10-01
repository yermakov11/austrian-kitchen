"use server";
import { ingredientSchema } from "@/schema/zod";
import { prisma } from "@/utils/prisma";
import { ZodError } from "zod";

export async function createIngredient(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      category: (formData.get("category") as string)?.toUpperCase(), 
      unit: (formData.get("unit") as string)?.toUpperCase(),
      pricePerUnit: formData.get("pricePerUnit")
        ? parseFloat(formData.get("pricePerUnit") as string)
        : null,
      description: formData.get("description") as string,
    };

    const validatedData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
        data: {
          name: validatedData.name,
          category: validatedData.category,
          unit: validatedData.unit,
          pricePerUnit: validatedData.pricePerUnit ?? undefined,
          description: validatedData.description
        }
    });

    return {success: true, ingredient}

  } catch (error) {
    if(error instanceof ZodError){
        return { error: error.issues.map(e => e.message).join(", ") };
    }

    console.error("Error creating ingredient:", error);
    return { error: "Failed to create ingredient" };
  }
}

export async function getIngredients(){
    try {
        const ingredients = await prisma.ingredient.findMany()
        return {success: true, ingredients}
    } catch (error) {
        console.error("Ingredient retrieval error ", error);
        return {error: "Ingredient retrieval error"}
    }
}

export async function deleteIngredients(id: string){
  try {
      const ingrediets = await prisma.ingredient.delete({
          where:{ id }
      })
      return {success: true, ingrediets}
  } catch (error) {
    console.log("Delete retrieval error ", error);
    return{error: "Delete retrieval error"}
  }
}