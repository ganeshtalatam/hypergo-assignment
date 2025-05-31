import { useState } from "react";
import { MdDelete, MdEdit, MdCheck } from "react-icons/md";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ISection } from "./AddComponentsInterface";
import { getRandomId } from "~/utils/helpers";

const Sections = ({
  sections,
  setSections,
}: {
  sections: ISection[];
  setSections: React.Dispatch<React.SetStateAction<ISection[]>>;
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
  };

  const handleEditClick = (id: string, currentTitle: string) => {
    setEditId(id);
    setEditValue(currentTitle);
  };

  const handleEditSave = (id: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, title: editValue } : section
      )
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <Card className="w-full h-1/3 p-4 flex flex-col gap-4 items-center">
      {sections.map((section) => (
        <Card
          className="w-full p-2 flex flex-row items-center"
          key={section.id}
        >
          <CardContent className="flex-1">
            {editId === section.id ? (
              <input
                className="border border-gray-300 bg-white text-black px-2 py-1 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              section.label
            )}
          </CardContent>
          {editId === section.id ? (
            <Button
              className="ml-2"
              size="icon"
              onClick={() => handleEditSave(section.id)}
            >
              <MdCheck />
            </Button>
          ) : (
            <Button
              className="ml-2"
              size="icon"
              variant="outline"
              onClick={() => handleEditClick(section.id, section.label)}
            >
              <MdEdit />
            </Button>
          )}
          <Button
            className="ml-2"
            size="icon"
            variant="destructive"
            onClick={() => handleRemoveSection(section.id)}
          >
            <MdDelete />
          </Button>
        </Card>
      ))}
      <div>
        <Button onClick={handleAddSection}>+</Button>
      </div>
    </Card>
  );
};

export default Sections;
