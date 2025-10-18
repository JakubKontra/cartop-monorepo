import Button from '@/components/atoms/button/Button';
import { MessageCircleQuestionMark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

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
    <div className="relative flex h-full w-full flex-col p-16 rounded-2xl overflow-hidden aspect-[1400/700] bg-gunmetal">
      <div className="absolute inset-0 left-1/2 z-0">
        <Image src={image} alt={alt} className="object-cover object-left" fill />
      </div>
      <div className="relative z-20 flex h-full flex-col max-lg:hidden max-w-1/2 pr-4">
        <h3 className="text-5xl whitespace-pre-line text-white font-semibold">{title}</h3>
        <p className="text-white md:mt-8">{text}</p>
        <Link href={buttonLink} className="mt-12">
          <Button variant="primary" icon={<MessageCircleQuestionMark className="size-5" />}>
            Zjistit více
          </Button>
        </Link>
      </div>
    </div>
  );
};
