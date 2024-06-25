import { getPosts } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
const page = async () => {
  const res = await getPosts();
  if (res.error) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center">
        <p>Internal Server Error!</p>
      </div>
    );
  }
  return (
    <div className="min-h-[80dvh]">
      <div className="grid md:grid-cols-2 gap-3">
        {res.message &&
          res?.recipes.map((ele) => {
            return (
              <Card className="py-2 px-3 flex flex-col gap-3">
                <CardTitle className=" flex items-center justify-center">
                  <div className="w-[300px] h-[300px]">
                    <Image
                      src={ele.image}
                      alt="Card background"
                      className="rounded-xl object-fill w-full h-full"
                      width={300}
                      height={300}
                    />
                  </div>
                </CardTitle>
                <CardDescription className="text-center">
                  {ele.title}
                </CardDescription>
                <CardFooter className="flex items-center justify-center">
                  <Link
                    href={`/post/${ele.id}`}
                    className="w-8/12 bg-green-600 py-2 px-4 rounded-xl border text-center hover:bg-green-800"
                  >
                    See Recipe
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default page;
