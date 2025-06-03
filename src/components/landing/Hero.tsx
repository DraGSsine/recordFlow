import React from "react";
import { Badge } from "../ui/badge";
import { LaurelWreath01Icon } from "hugeicons-react";
import { Button } from "../ui/button";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex py-10 flex-col items-center">
      <section className=" flex items-center flex-col gap-10 pt-10">
        <h1 className="max-w-[900px] font-bold text-8xl text-center">
          <span className=" text-primary bg-[length:200%_200%]">Smooth </span>
          Screen Videos in <span>Seconds</span>
        </h1>
        <p className=" text-zinc-400 text-center text-lg  ">
          Beautiful Screen Recordings in Minutes Screen Recorder producing{" "}
          <br />
          high-impact videos automatically.
        </p>
        <Link href="#pricing">
          <Button className=" rounded-full text-lg text-white py-7 px-8 cursor-pointer">
            Try RecordFlow For Free
          </Button>
        </Link>
        <div className=" w-[900px] h-[550px]">
          <iframe
            className=" h-full w-full rounded-3xl"
            src="https://www.youtube.com/embed/c02YoWR9gSY?si=vyG9jGhV8KH0AISh&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Hero;
