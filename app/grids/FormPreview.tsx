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
  formFieldConfig,
  ...props
}: {
  formFieldConfig: IFormField;
}) {
  switch (formFieldConfig.variant) {
    case "Input":
      return (
        <Input {...props} readOnly placeholder={formFieldConfig.placeholder} />
      );
    case "Textarea":
      return (
        <Textarea
          {...props}
          readOnly
          placeholder={formFieldConfig.placeholder}
        />
      );
    default:
      return null;
  }
}

const FormPreview = ({
  formFields,
  updateFormFields,
  setSelectedComponent,
}: {
  formFields: IFormField[];
  updateFormFields: (fields: IFormField[]) => void;
  setSelectedComponent: React.Dispatch<
    React.SetStateAction<IFormField["name"] | null>
  >;
}) => {
  const form = useForm();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const variant = e.dataTransfer.getData("variant") as IFormField["variant"];
    updateFormFields([...formFields, getInitialFormConfig(variant)]);
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
      className="flex-1 min-h-[300px] p-4 border-2 border-dashed border-gray-300 max-h-[95vh] overflow-y-auto"
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
              <div key={comp.name} className="relative mt-5">
                <span className="absolute -top-3 right-0 z-10 bg-white px-2 text-xs font-semibold text-gray-500 rounded-sm">
                  {comp.name}
                </span>
                <Card className="p-4">
                  <FormField
                    control={form.control}
                    name={comp.name}
                    render={({ field }) => (
                      <FormItem onClick={() => setSelectedComponent(comp.name)}>
                        <FormLabel required={comp.required}>
                          {comp.label}
                        </FormLabel>
                        <FormControl>
                          <ComponentRenderer
                            formFieldConfig={comp}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>{comp.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
              </div>
            ))
          )}
        </form>
      </Form>
    </Card>
  );
};

export default FormPreview;
