import { useState } from "react";
import { Card } from "~/components/ui/card";
import { IFormField } from "./AddComponentsInterface";
import { getInitialFormConfig } from "~/utils/helpers";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

function ComponentRenderer({
  variant,
  ...props
}: {
  variant: IFormField["variant"];
}) {
  switch (variant) {
    case "Input":
      return <Input {...props} />;
    case "Textarea":
      return <Textarea {...props} />;
    default:
      return null;
  }
}

const FormPreview = () => {
  const [formFields, setFormFields] = useState<IFormField[]>([]);
  const form = useForm();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const variant = e.dataTransfer.getData("variant") as IFormField["variant"];
    setFormFields((prev) => [...prev, getInitialFormConfig(variant)]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  function onSubmit(values: Record<string, any>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card
      className="flex-1 min-h-[300px] p-4 border-2 border-dashed border-gray-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="font-semibold mb-2">Form Preview</div>
          {formFields.length === 0 ? (
            <div className="text-gray-400 text-center">
              Drop components here
            </div>
          ) : (
            formFields.map((comp) => (
              <FormField
                key={comp.name}
                control={form.control}
                name={comp.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{comp.label}</FormLabel>
                    <FormControl>
                      <ComponentRenderer variant={comp.variant} {...field} />
                    </FormControl>
                    <FormDescription>{comp.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))
          )}
        </form>
      </Form>
    </Card>
  );
};

export default FormPreview;
