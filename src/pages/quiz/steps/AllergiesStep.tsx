import { useState } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AllergiesStepProps {
  control: Control<any>;
}

export default function AllergiesStep({ control }: AllergiesStepProps) {
  const [newAllergy, setNewAllergy] = useState("");

  const commonIngredients = [
    "Fragrance",
    "Alcohol",
    "Parabens",
    "Sulfates",
    "Essential Oils",
    "Salicylic Acid",
    "Retinol",
    "Benzoyl Peroxide",
    "Niacinamide",
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Do you have any allergies or sensitivities?
        </h2>
        <p className="text-muted-foreground">
          Add any ingredients you know your skin reacts to.
        </p>
      </div>

      <FormField
        control={control}
        name="allergies"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <div className="flex space-x-2">
              <FormControl>
                <Input
                  placeholder="Enter an ingredient"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newAllergy.trim()) {
                      e.preventDefault();
                      if (!field.value.includes(newAllergy.trim())) {
                        field.onChange([...field.value, newAllergy.trim()]);
                      }
                      setNewAllergy("");
                    }
                  }}
                />
              </FormControl>
              <Button
                type="button"
                onClick={() => {
                  if (
                    newAllergy.trim() &&
                    !field.value.includes(newAllergy.trim())
                  ) {
                    field.onChange([...field.value, newAllergy.trim()]);
                    setNewAllergy("");
                  }
                }}
              >
                Add
              </Button>
            </div>

            <div className="space-y-2">
              <FormLabel>Common ingredients people are sensitive to:</FormLabel>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant={
                      field.value.includes(ingredient) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => {
                      if (field.value.includes(ingredient)) {
                        field.onChange(
                          field.value.filter((i: string) => i !== ingredient),
                        );
                      } else {
                        field.onChange([...field.value, ingredient]);
                      }
                    }}
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            {field.value.length > 0 && (
              <div className="space-y-2">
                <FormLabel>Your allergies/sensitivities:</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((allergy: string) => (
                    <Badge key={allergy} className="flex items-center gap-1">
                      {allergy}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          field.onChange(
                            field.value.filter((a: string) => a !== allergy),
                          );
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
