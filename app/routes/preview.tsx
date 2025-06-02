import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";

import { IFormField } from "~/grids/AddComponentsInterface";

import { decryptConfig } from "~/utils/decryptConfig";

function Preview() {
  const [searchParams] = useSearchParams();
  const [sections, setSections] = useState<IFormField[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config = await decryptConfig(
          searchParams.get("config") ?? "",
          window.ENV.PUBLIC_SECRET_KEY
        );
        console.log(config, "?>>config");
        setSections(config as IFormField[]);
      } catch (error) {
        setError("Failed to load form configuration");
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading form configuration...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">Form Preview</h1>
      aa
    </div>
  );
}

export default Preview;
