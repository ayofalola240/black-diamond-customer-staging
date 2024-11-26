import Image from "next/image";

export default function Page() {
  return (
    <article className="w-full text-white max-w-container mx-auto flex flex-col py-[30px] sm:py-[60px] px-6 gap-6 ">
      <header className="pb-[10px] sm:pb-[20px] border-b border-[#EEEEEE]">
        <h2 className="section-header">Black Diamond Foundation</h2>
      </header>
      <section className="flex flex-col gap-12 items-center sm:items-start md:flex-row">
        <div className="relative w-full h-[300px] md:mt-[58px] sm:h-[300px] sm:min-w-[300px] lg:h-[398px] lg:min-w-[478px]">
          <Image fill alt="Black Diamond Logo" src="/svgs/logo.svg" />
        </div>
        <section className="flex gap-6 flex-col">
          <p>
            Lorem ipsum dolor sit amet consectetur. Elementum non in nisl elit
            semper. Aenean eu neque lacus hendrerit imperdiet id sem faucibus
            amet. Nulla tristique sed ornare mauris velit enim. In orci nunc
            tristique in dui sed ut pulvinar. Dignissim in pellentesque in at
            nullam nunc enim eu. Habitasse posuere risus suspendisse aliquet
            quis sed duis sapien. Nunc lectus amet dictumst consectetur velit
            tortor euismod. Adipiscing volutpat amet est nisl. At neque nascetur
            eget diam risus quis nunc facilisis vehicula. Scelerisque volutpat
            dignissim eget morbi dictum sit mauris. Ipsum lacus eget odio
            integer. Auctor enim orci est commodo. Laoreet lectus metus ipsum
            adipiscing consequat elementum.
          </p>

          <p>
            Lectus leo volutpat egestas elementum. Lacus eros a feugiat tellus
            faucibus nisl. Et enim in habitant sed sit adipiscing. Sagittis
            facilisi malesuada enim volutpat. Et bibendum nunc et id vitae amet.
            Eget adipiscing elementum arcu viverra cras mattis dui. Neque tortor
            imperdiet lectus quis eget. In blandit tellus morbi sed porttitor.
            Dolor nam id netus commodo amet faucibus. Erat risus malesuada
            fermentum a netus. Consequat adipiscing velit sem pharetra aliquam
            arcu et rhoncus in. Purus nibh etiam ornare porta nam vitae.
            Faucibus et id donec curabitur ut blandit. In fusce nec praesent mus
            pellentesque diam imperdiet.
          </p>

          <p>
            Vel nisl nulla netus sagittis massa. Eu vel enim blandit vestibulum
            purus sit fringilla morbi mollis. Eu at fringilla aliquam lobortis
            enim ullamcorper. Pharetra malesuada eleifend a risus etiam. Cursus
            tellus enim sem feugiat diam amet posuere. Erat phasellus enim neque
            pellentesque aliquam sagittis condimentum interdum. Eget orci enim
            tortor nibh sit sed. Sit ut condimentum adipiscing eget tortor vitae
            mi. Blandit quam ultrices morbi massa leo feugiat id phasellus sit.
            Phasellus vel quisque platea est aliquam. Posuere facilisis nisl
            mattis placerat.
          </p>

          <p>
            Volutpat tincidunt et nisi malesuada aliquam ultricies. Morbi morbi
            amet augue pulvinar eget lacus auctor in tincidunt. Tortor
            pellentesque et in et. Congue varius enim lectus scelerisque
            adipiscing elementum adipiscing. Amet euismod fames cursus facilisis
            lectus nisl porta. Est varius sollicitudin gravida laoreet
            ullamcorper lorem leo risus. Duis sit lorem interdum elementum.
            Lacus purus fames bibendum proin sit. Netus elementum consectetur
            nisl nisl elit aliquam velit. Enim ipsum senectus non lectus
            tincidunt. Turpis ut vulputate neque magna fermentum aliquam eget.
            Ultricies eget tellus a id.
          </p>
        </section>
      </section>
    </article>
  );
}
