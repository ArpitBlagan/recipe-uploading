import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
const Hero = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center min-h-[60dvh]">
        <p className="text-[30px] md:text-[40px] text-center">
          Welcome to our{" "}
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            {" "}
            Recipe Sharing platform,{" "}
          </span>
          <br />
          a community-driven site where food enthusiasts
          <br /> can upload, discover, and share their favorite
          <br />
          recipes from around the world.
        </p>
        <div className="flex gap-5">
          <Link
            href="/upload"
            className="border rounded-xl py-2 px-3 cursor-pointer bg-green-600"
          >
            Post Recipe
          </Link>
          <Link
            href="/posts"
            className="border rounded-xl py-2 px-3 cursor-pointer bg-red-600"
          >
            See Posts
          </Link>
        </div>
      </div>
      <div className="flex f items-center justify-center h-[60dvh]">
        <iframe
          src="https://www.loom.com/embed/62d0f97ea74f486582726ebea827e86c?sid=2f3442c3-09cf-4130-8d85-b0a1e899f052"
          className="w-[700px] h-[400px] rounded-md"
        ></iframe>
      </div>
      <div className="flex items-center justify-center min-h-[40dvh]">
        <Accordion type="single" collapsible className="w-8/12 ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Stack used?</AccordionTrigger>
            <AccordionContent>
              Next-JS + Next-Auth + Tailwind + Shadcn-ui.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Image uploading?</AccordionTrigger>
            <AccordionContent>AWS S3.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Form validation?</AccordionTrigger>
            <AccordionContent>Zod + react-hook-form.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Hero;
