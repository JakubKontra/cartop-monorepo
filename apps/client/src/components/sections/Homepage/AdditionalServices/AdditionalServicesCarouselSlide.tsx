import Button from '@/components/atoms/button/Button';
import { MessageCircleQuestionMark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/utils/cv';
export interface AdditionalServicesCarouselSlideProps {
  image: string;
  alt: string;
  title: ReactNode;
  text: string;
  buttonLink: string;
}

export const AdditionalServicesCarouselSlide = ({
  image,
  alt,
  title,
  text,
  buttonLink,
}: AdditionalServicesCarouselSlideProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col px-6 pt-52 pb-24 md:px-10 md:pt-10 md:pb-24 xl:p-16 rounded-2xl overflow-hidden bg-gunmetal',
        'xl:aspect-[1400/700]',
      )}
    >
      <div className="absolute aspect-[2090/1486] w-2/3 sm:w-1/2 lg:w-1/2 xl:w-1/2 right-0 top-0 z-0">
        <Image src={image} alt={alt} className="object-contain xl:object-cover object-left" fill />
      </div>
      <div className="relative z-20 flex h-full flex-col md:max-w-1/2 lg:max-w-1/2 xl:max-w-1/2 pr-4">
        <h3 className="text-4xl md:text-5xl whitespace-pre-line text-white font-semibold">
          {title}
        </h3>
        <p className="text-white mt-4 md:mt-8">{text}</p>
        <Link href={buttonLink} className="mt-6 md:mt-12">
          <Button variant="primary" icon={<MessageCircleQuestionMark className="size-5" />}>
            Zjistit více
          </Button>
        </Link>
      </div>
    </div>
  );
};
