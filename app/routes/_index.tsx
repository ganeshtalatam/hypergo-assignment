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
    <div className="flex flex-row items-start justify-between gap-4 p-4 max-h-[100vh] overflow-y-auto box-border">
      <div className="w-1/5 flex flex-col gap-4 max-h-[95vh] overflow-y-auto">
        <Sections />
        <AddComponentsInterface />
      </div>
      <div className="w-3/5 max-h-[95vh] overflow-y-auto">
        <FormPreview
          formFields={formFields}
          setFormFields={setFormFields}
          setSelectedComponent={setSelectedComponent}
        />
      </div>
      <div className="w-1/5">
        <EditComponentConfig
          selectedComponent={selectedComponent}
          formFields={formFields}
          setFormFields={setFormFields}
        />
      </div>
    </div>
  );
}
