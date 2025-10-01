"use server"

import { prisma } from "@/utils/prisma";

export async function getRecipes() {
    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });
        return { success: true, recipes };
    } catch (error) {
        console.error(error);
        return { error: "Failed to fetch recipes" };
    }
}

export async function createRecipe(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("image_url") as string|null;

        const ingredients = Array.from(formData.entries())
        .filter(([key]) => key.startsWith("ingredient_"))
        .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: parseFloat(
                formData.get(`quantity_${key.replace("ingredient_", "")}`) as string
            )
        }));

        if(!name || ingredients.length === 0) {
            return {
                success: false,
                error: "Name and ingredients are required",
            }
        }

        const recipe = await prisma.recipe.create({
            data: {
                name,
                description,
                image_url: imageUrl,
                ingredients: {
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.ingredientId,
                        quantity: ingredient.quantity,
                    })),
                },
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return { success: true, recipe };

    } catch (error) {
        console.error(error);
        return { error: "Failed to create recipe" };
    }   
}

export async function updateRecipe(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("image_url") as string|null;

        const ingredients = Array.from(formData.entries())
        .filter(([key]) => key.startsWith("ingredient_"))
        .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: parseFloat(
                formData.get(`quantity_${key.replace("ingredient_", "")}`) as string
            )
        }));

        if(!name || ingredients.length === 0) {
            return {
                success: false,
                error: "Name and ingredients are required",
            }
        }

      const recipe = await prisma.recipe.update({
        where: { id },
        data: {
            name,
            description,
            image_url: imageUrl,
            ingredients: {
                deleteMany: {},
                create: ingredients.map((ingredient) => ({
                    ingredientId: ingredient.ingredientId,
                    quantity: ingredient.quantity,
                })),
            },
        },
        include: {
            ingredients: {
                include: {
                    ingredient: true,
                },
            },
        },
      });

        return { success: true, recipe };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update recipe" };
    }
}

export async function deleteRecipe(id: string) {
    try {

        await prisma.recipeIngredient.deleteMany({
            where: { recipeId: id },
        });

        await prisma.recipe.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete recipe" };
    }
}
