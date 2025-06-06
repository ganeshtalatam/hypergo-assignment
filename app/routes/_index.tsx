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
import Navbar from "~/grids/Navbar";
import Sections from "~/grids/Sections";
import { getRandomId } from "~/utils/helpers";
import { useNavigate } from "@remix-run/react";
import { encryptConfig } from "~/utils/encryptConfig";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
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

  const handlePreview = async () => {
    const encrypted = await encryptConfig(
      sections,
      (window as any).ENV.PUBLIC_SECRET_KEY
    );
    navigate(`/preview?config=${encodeURIComponent(encrypted)}`);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Navbar handlePreview={handlePreview} />
      <div className="flex-1 flex flex-row items-start justify-between gap-4 p-4 overflow-y-auto box-border">
        <div className="w-1/5 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
          <Sections
            sections={sections}
            setSections={setSections}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          <AddComponentsInterface />
        </div>
        <div className="w-3/5 max-h-[90vh] overflow-y-auto">
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
            setCurrentField={setCurrentField}
          />
        </div>
      </div>
    </div>
  );
}
