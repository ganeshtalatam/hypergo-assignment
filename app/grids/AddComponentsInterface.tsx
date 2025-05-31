import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { getInitialFormConfig } from "~/utils/helpers";

export interface IField {
  label: string;
  variant: "Input" | "Textarea" | "Checkbox" | "Select" | "DatePicker";
}

export interface IFormField {
  variant: IField["variant"];
  type: string;
  placeholder?: string;
  name: string;
  label: string;
  description?: string;
}

const initialComponents: IField[] = [
  { label: "Input", variant: "Input" },
  { label: "Text Area", variant: "Textarea" },
  { label: "Checkbox", variant: "Checkbox" },
  { label: "Dropdown", variant: "Select" },
  { label: "Date", variant: "DatePicker" },
];

const AddComponentsInterface = () => {
  // Drag event handlers
  const handleDragStart = (e: React.DragEvent, field: IField) => {
    console.log("Drag started for:", field);
    e.dataTransfer.setData("variant", field.variant);
  };

  return (
    <Card className="w-5/6 h-full p-4">
      {initialComponents.map((component) => {
        return (
          <Card
            key={component.variant}
            className="w-full p-2 mb-2 flex flex-col items-center cursor-move"
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
          >
            <CardContent className="flex flex-col items-center align-middle justify-center">
              {component.label}
            </CardContent>
          </Card>
        );
      })}
    </Card>
  );
};

export default AddComponentsInterface;
