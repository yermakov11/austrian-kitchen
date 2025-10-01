"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constans/select-options";
import { Form } from "@heroui/form";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useState, useTransition } from "react";
import {useIngredientStore} from "@/store/ingredient.store"

const initialState = {
  name: "",
  category: "",
  unit: "",
  pricePerUnit: null as number | null,
  description: "",
};

const IngredientForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {addIngredients} = useIngredientStore()

  const handleSubmit = async (formData: FormData) => {
    console.log("Form submitted: ", formData);

    startTransition(async () => {
      await addIngredients(formData)
      const storeError = useIngredientStore.getState().error;

      if (storeError) {
        setError(storeError);
        alert("Error in create ingredients");
      } else {
        setError(null);
        setFormData(initialState);
      }
    });
  };

  return (
    <Form className="w-full" action={handleSubmit}>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <Input
        isRequired
        name="name"
        placeholder="Input name ingredient"
        type="text"
        value={formData.name}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        validate={(value) => (!value ? "Name is required" : null)}
      />

      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Select
            isRequired
            name="category"
            placeholder="Category"
            selectedKeys={formData.category ? [formData.category] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-1/3">
          <Select
            isRequired
            name="unit"
            placeholder="Unit"
            selectedKeys={formData.unit ? [formData.unit] : []}
            classNames={{
              trigger: "bg-default-100 w-full",
              innerWrapper: "text-sm",
              value: "truncate",
              selectorIcon: "text-black",
            }}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          >
            {UNIT_OPTIONS.map((option) => (
              <SelectItem key={option.value} className="text-black">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-1/3">
          <Input
            isRequired
            name="pricePerUnit"
            placeholder="Price"
            type="number"
            value={
              formData.pricePerUnit !== null
                ? formData.pricePerUnit.toString()
                : ""
            }
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm focus:outline-none",
            }}
            onChange={(e) => {
              const value = e.target.value ? parseFloat(e.target.value) : null;
              setFormData({ ...formData, pricePerUnit: value });
            }}
            endContent={
              <span className="absolute right-3 top-1/2 transform -translate-y-1">
                $
              </span>
            }
            validate={(value) => {
              if (!value) return "Price is required";
              const num = parseFloat(value);
              if (isNaN(num) || num < 0) return "Price should be positive";
              return null;
            }}
          />
        </div>
      </div>

      <Input
        name="description"
        placeholder="Input description"
        type="text"
        value={formData.description}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:outline-none",
        }}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <div className="flex w-full items-center justify-end">
        <Button color="primary" type="submit" isLoading = {isPending}>
          Add ingredient
        </Button>
      </div>
    </Form>
  );
};

export default IngredientForm;
