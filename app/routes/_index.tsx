import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import AddComponentsInterface, {
  IFormField,
} from "~/grids/AddComponentsInterface";
import EditComponentConfig from "~/grids/EditComponentConfig";
// import { Button } from "~/components/ui/button";
// import AddComponentsInterface from "~/grids/AddComponentsInterface";
// import FormBuilderLayout from "~/grids/FormBuilderLayout";
import FormPreview from "~/grids/FormPreview";
import Sections from "~/grids/Sections";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [formFields, setFormFields] = useState<IFormField[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<
    IFormField["name"] | null
  >(null);

  return (
    <div className="flex flex-row items-start justify-between gap-4 p-4">
      <div className="flex flex-col w-1/4 h-full gap-4">
        <Sections />
        <AddComponentsInterface />
      </div>
      <FormPreview
        formFields={formFields}
        setFormFields={setFormFields}
        setSelectedComponent={setSelectedComponent}
      />
      <EditComponentConfig
        selectedComponent={selectedComponent}
        formFields={formFields}
        setFormFields={setFormFields}
      />
    </div>
  );
}
