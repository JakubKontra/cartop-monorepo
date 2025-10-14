import HowItWorksButton from '@/components/organisms/HowItWorksButton';
import { ReliablePartnerCarousel } from './ReliablePartnerCarousel';

export const ReliablePartner = () => {
  return (
    <div className="w-full py-20">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-4 px-4 max-w-[1360px] mx-auto">
        <h2 className="w-full text-4xl lg:text-5xl">
          Váš <span className="headline-highlight">spolehlivý</span>
          <br />
          partner
        </h2>
        <div className="flex items-end">
          <p className="w-full">
            Naší prioritou je, aby pořízení auta bylo férové a přehledné. Už desítky tisíc zákazníků
            s námi získaly vůz, který dává smysl – s jasnými podmínkami a úsporou oproti běžné
            cestě. Díky tomu víte, že jste v dobrých rukou.
          </p>
        </div>
      </div>
      <ReliablePartnerCarousel className="w-full" />
      <HowItWorksButton className="mt-10 lg:mt-14 flex justify-center" />
    </div>
  );
};
