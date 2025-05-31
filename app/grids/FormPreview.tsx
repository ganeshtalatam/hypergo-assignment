import { useState } from "react";
import { Card } from "~/components/ui/card";
import { IFormField } from "./AddComponentsInterface";
import { getInitialFormConfig } from "~/utils/helpers";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

function ComponentRenderer({ component }: { component: IFormField }) {
  switch (component.variant) {
    case "Input":
      return <Input />;
    case "Textarea":
      return <Textarea />;
    default:
      return null;
  }
}

const FormPreview = () => {
  const [formFields, setFormFields] = useState<IFormField[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const variant = e.dataTransfer.getData("variant") as IFormField["variant"];
    setFormFields((prev) => [...prev, getInitialFormConfig(variant)]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      className="flex-1 min-h-[300px] p-4 border-2 border-dashed border-gray-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="font-semibold mb-2">Form Preview</div>
      {formFields.length === 0 ? (
        <div className="text-gray-400 text-center">Drop components here</div>
      ) : (
        formFields.map((comp) => (
          <ComponentRenderer key={comp.name} component={comp} />
        ))
      )}
    </Card>
  );
};

export default FormPreview;
