import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import AddComponentsInterface, {
  IFormField,
  ISection,
} from "~/grids/AddComponentsInterface";
import EditComponentConfig from "~/grids/EditComponentConfig";
// import { Button } from "~/components/ui/button";
// import AddComponentsInterface from "~/grids/AddComponentsInterface";
// import FormBuilderLayout from "~/grids/FormBuilderLayout";
import FormPreview from "~/grids/FormPreview";
import Sections from "~/grids/Sections";
import { getRandomId } from "~/utils/helpers";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [sections, setSections] = useState<ISection[]>([
    {
      id: getRandomId("section"),
      label: "Section 1",
      fields: [],
    },
  ]);
  const [currentSection, setCurrentSection] = useState<ISection["id"] | null>(
    sections[0].id ?? null
  );
  const [currentField, setCurrentField] = useState<IFormField["name"] | null>(
    null
  );

  const formFields =
    sections.find((section) => section.id === currentSection)?.fields ?? [];

  const updateFormFields = (fields: IFormField[]) => {
    setSections(
      sections.map((section) =>
        section.id === currentSection ? { ...section, fields } : section
      )
    );
  };

  return (
    <div className="flex flex-row items-start justify-between gap-4 p-4 max-h-[100vh] overflow-y-auto box-border">
      <div className="w-1/5 flex flex-col gap-4 max-h-[95vh] overflow-y-auto">
        <Sections
          sections={sections}
          setSections={setSections}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <AddComponentsInterface />
      </div>
      <div className="w-3/5 max-h-[95vh] overflow-y-auto">
        <FormPreview
          formFields={formFields}
          updateFormFields={updateFormFields}
          currentField={currentField}
          setCurrentField={setCurrentField}
        />
      </div>
      <div className="w-1/5">
        <EditComponentConfig
          currentField={currentField}
          formFields={formFields}
          updateFormFields={updateFormFields}
        />
      </div>
    </div>
  );
}
