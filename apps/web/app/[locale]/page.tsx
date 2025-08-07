import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <Button>{t("title")}</Button>
      <Button variant={"destructive"}>asd</Button>
    </div>
  );
}
