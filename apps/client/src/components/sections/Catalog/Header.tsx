import Button from '@/components/atoms/button/Button';
import { ChevronRight } from 'lucide-react';

export const CatalogHeader = () => {
  return (
    <div className="flex w-full mx-auto max-w-[1440px] px-4">
      <div
        className="flex gap-6 items-end w-full bg-gunmetal h-[345px] rounded-b-[48px] mb-[50px] bg-cover bg-center bg-no-repeat p-[40px]"
        style={{
          backgroundImage: "url('/65@2x.png ')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-[445px] flex flex-col gap-6">
          <span className="font-sora text-3xl font-normal leading-[120%] tracking-[0.01em] text-white">
            Využijte <br />
            <span className="text-primary font-semibold">akčních</span> nabídek
          </span>
          <Button
            icon={<ChevronRight className="size-5" />}
            size="narrow"
            variant="primary"
            width="auto"
          >
            Prohlédnout
          </Button>
        </div>
      </div>
    </div>
  );
};
