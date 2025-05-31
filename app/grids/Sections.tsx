import { useState } from "react";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ISection } from "./AddComponentsInterface";
import { getRandomId } from "~/utils/helpers";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { Input } from "~/components/ui/input";

const Sections = ({
  sections,
  setSections,
  currentSection,
  setCurrentSection,
}: {
  sections: ISection[];
  setSections: React.Dispatch<React.SetStateAction<ISection[]>>;
  currentSection: ISection["id"] | null;
  setCurrentSection: React.Dispatch<
    React.SetStateAction<ISection["id"] | null>
  >;
}) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleRemoveSection = (id: string) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
    if (editId === id) setEditId(null);
  };

  const handleAddSection = () => {
    const newSection = {
      id: getRandomId("section"),
      label: "New Section",
      fields: [],
    };
    setSections((currentSections) => [...currentSections, newSection]);
    setCurrentSection(newSection.id);
  };

  const handleEditClick = (id: string, currentTitle: string) => {
    setEditId(id);
    setEditValue(currentTitle);
  };

  const handleEditSave = (id: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, label: editValue } : section
      )
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <Card className="w-full h-1/3 p-4 flex flex-col gap-4 items-center">
      {sections.map((section, idx) => (
        <Card
          className={clsx(
            "w-full p-2 flex flex-row items-center",
            currentSection === section.id && "border-primary border-2"
          )}
          key={section.id}
          onClick={() => setCurrentSection(section.id)}
        >
          <CardContent className="flex-1 p-1">
            {editId === section.id ? (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={(e) => {
                  // avoid onBlur when clicking close or save button
                  if (
                    !["close-edit", "save-edit"].includes(
                      (e.relatedTarget as HTMLButtonElement)?.name
                    )
                  ) {
                    setEditId(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditSave(section.id);
                  }
                }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            ) : (
              <>{`${idx + 1}. ${section.label}`}</>
            )}
          </CardContent>

          {(() => {
            if (editId === section.id) {
              return (
                <>
                  <Button
                    className="ml-2"
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      setEditId(null);
                    }}
                    name="close-edit"
                  >
                    <IoCloseOutline />
                  </Button>
                  <Button
                    className="ml-2"
                    size="icon"
                    onClick={() => {
                      handleEditSave(section.id);
                    }}
                    name="save-edit"
                  >
                    <MdCheck />
                  </Button>
                </>
              );
            }

            return (
              <>
                <Button
                  className="ml-2"
                  size="icon"
                  variant="outline"
                  onClick={() => handleEditClick(section.id, section.label)}
                >
                  <MdEdit size={24} />
                </Button>
                <Button
                  className="ml-2"
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemoveSection(section.id)}
                  disabled={sections.length === 1}
                >
                  <MdDelete />
                </Button>
              </>
            );
          })()}
        </Card>
      ))}
      <div>
        <Button onClick={handleAddSection}>+</Button>
      </div>
    </Card>
  );
};

export default Sections;
