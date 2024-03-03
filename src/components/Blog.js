import Image from "next/image";

export default function Blog({ blogDetails }) {
  return (
    <div>
      <div className="flex h-[28rem] relative overflow-hidden rounded-md mt-10">
        {blogDetails?.coverImage && (
          <Image
            alt="Mountains"
            src={blogDetails?.coverImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover w-full"
            priority
          />
        )}
      </div>
      <h1 className="font-bold text-5xl mt-10">{blogDetails?.title}</h1>
      <p className="text-sm mt-10 text-slate-400">{blogDetails?.createdAt}</p>
      <div
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: blogDetails?.content,
        }}
      />
    </div>
  );
}
