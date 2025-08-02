import BlurText from "@/components/BlurText";
import ColourfulText from "@/components/ui/colourful-text";

const page = () => {
  return (
    <>
      <div className="container py-20 px-5">
        <div className="text-3xl font-semibold  md:text-5xl ">
          <BlurText
            text="Hi,"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl"
          />
          <span className="ml-5">
            <ColourfulText text={process.env.AdminName || "Admin"} />
          </span>
        </div>
        <BlurText
          text="Wellcome to the Admin Dashboard!"
          delay={350}
          animateBy="words"
          direction="top"
          className="flex items-center justify-center w-full ml-5 text:5xl sm:text-6xl text-center "
        />{" "}
      </div>
    </>
  );
};

export default page;
