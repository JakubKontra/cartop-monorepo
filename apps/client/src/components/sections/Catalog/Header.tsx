import { ChevronRight } from 'lucide-react';

import Button from '@/components/atoms/button/Button';

export const CatalogHeader = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] px-4">
      <div
        className="mb-[50px] flex h-[345px] w-full items-end gap-6 rounded-b-[48px] bg-gunmetal bg-cover bg-center bg-no-repeat p-[40px]"
        style={{
          backgroundImage: "url('/65@2x.png ')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex max-w-[445px] flex-col gap-6">
          <span className="font-sora text-3xl leading-[120%] font-normal tracking-[0.01em] text-white">
            Využijte <br />
            <span className="font-semibold text-primary">akčních</span> nabídek
          </span>
          <div className="flex gap-2">
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
    </div>
  );
};
