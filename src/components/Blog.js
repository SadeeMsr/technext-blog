import Image from "next/image";

export default function Blog({ blogDetails }) {
  return (
    <div>
      <div className="flex h-[28rem] relative overflow-hidden rounded-md mt-10">
        <Image
          src={blogDetails?.coverImg}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <h1 className="font-bold text-5xl mt-10">{blogDetails?.title}</h1>
      <p className="text-sm mt-10 text-slate-400">{blogDetails?.createdAt}</p>
      <div
        className="mt-5"
        dangerouslySetInnerHTML={{
          __html: blogDetails?.body
        }}
      />
    </div>
  );
}
