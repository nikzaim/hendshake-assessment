"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useTodoStore } from "@/lib/store";
import { ClipboardText } from "@phosphor-icons/react";

// Form validation schema using zod
const formSchema = z.object({
  activity: z.string().min(1, { message: "Activity is required" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  type: z.enum([
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ]),
  bookingRequired: z.boolean().default(false),
  accessibility: z.number().min(0).max(1),
});

export function TodoForm() {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: "",
      price: 0,
      type: "education",
      bookingRequired: false,
      accessibility: 0.5,
    },
  });

  // Get the addTodo function from the store
  const addTodo = useTodoStore((state) => state.addTodo);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTodo(values);
    form.reset(); // Reset form after submission
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <ClipboardText size={36} color="#3b82f6" weight="duotone" />
        Add a New Task
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Activity Field */}
          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity</FormLabel>
                <FormControl>
                  <Input placeholder="Enter activity..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Price Field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="diy">DIY</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="busywork">Busywork</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Booking Required Field */}
          <FormField
            control={form.control}
            name="bookingRequired"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Booking Required</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Accessibility Field */}
          <FormField
            control={form.control}
            name="accessibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accessibility ({field.value.toFixed(1)})</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>
                  From 0.0 (most accessible) to 1.0 (least accessible)
                </FormDescription>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-500 w-full cursor-pointer hover:bg-blue-400"
          >
            Add Task
          </Button>
        </form>
      </Form>
    </div>
  );
}
