import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Budget } from "@/types";

interface BudgetStepProps {
  control: Control<any>;
}

export default function BudgetStep({ control }: BudgetStepProps) {
  const budgetOptions = [
    {
      value: Budget.LOW,
      label: "Budget-Friendly",
      description: "Affordable drugstore and mass-market products",
    },
    {
      value: Budget.MEDIUM,
      label: "Mid-Range",
      description: "Mix of affordable and premium products",
    },
    {
      value: Budget.HIGH,
      label: "Premium",
      description: "High-end and luxury skincare products",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">What's your skincare budget?</h2>
        <p className="text-muted-foreground">
          Select your preferred price range for skincare products.
        </p>
      </div>

      <FormField
        control={control}
        name="budget"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                {budgetOptions.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium">
                        {option.label}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
