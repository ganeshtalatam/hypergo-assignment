import AddComponentsInterface from "./AddComponentsInterface";
import FormBuilderCanvas from "./FormBuilderCanvas";

const FormBuilderLayout = () => {
  return (
    <div className="flex w-full h-screen gap-4 p-4 bg-gray-50">
      <AddComponentsInterface />
      <FormBuilderCanvas />
    </div>
  );
};

export default FormBuilderLayout;
