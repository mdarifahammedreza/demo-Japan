import ImageView from "@/app/components/ImageView";
import Private from "@/app/components/Private/private";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/Data/Image/Curosol/image.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  return data.map((item) => ({
    id: item.id.toString(),
  }));
}

export default async function Page({ params }) {
  const { id } = params;

  const filePath = path.join(process.cwd(), 'public/Data/Image/Curosol/image.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const matched = data.find((item) => item.id.toString() === id);

  return (
    <Private>
      <ImageView img={matched || null} />
    </Private>
  );
}
