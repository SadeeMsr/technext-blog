import Image from "next/image";
import { Suspense } from "react";
import Loader from "./Loader";
import FavoriteBtn from "./FavoriteBtn";
import Link from "next/link";

export default function BlogCard({ withBody, cardBody, removeData }) {
  return (
    <div
      className={`flex w-full gap-5 py-16 border-b ${
        withBody ? "border-slate-800" : "border-slate-300"
      }`}
    >
      <div className="w-[40%]">
        {cardBody?.coverImg && (
          <div
            className={`overflow-hidden relative ${
              withBody ? "h-[15rem]" : "h-[8rem]"
            } rounded-md bg-blue-200`}
          >
            <Suspense fallback={<Loader />}>
              <Image
                alt="Mountains"
                src={cardBody?.coverImg}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover w-full"
                priority
              />
            </Suspense>
          </div>
        )}
      </div>
      <div
        className={`w-[60%] flex flex-col ${
          withBody ? "justify-between" : "justify-center"
        } pe-10`}
      >
        <Link href={`/blog-details/${cardBody?.id}`}>
          <div className="hover:underline">
            <h1
              className={`font-semibold ${
                withBody ? "text-2xl" : "text-lg"
              }`}
            >
              {cardBody?.title}
            </h1>
            {withBody && (
              <div
                className="text-slate-500 mt-5 font-light hover:underline"
                dangerouslySetInnerHTML={{
                  __html: cardBody?.body.substring(0, 300),
                }}
              />
            )}
          </div>
        </Link>
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-xs">
            {new Date(cardBody?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {withBody && <FavoriteBtn cardBody={cardBody} />}
          {!withBody && (
            <p
              onClick={() => removeData(cardBody?.id)}
              className="text-slate-400 text-xs cursor-pointer"
            >
              Unmark
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
