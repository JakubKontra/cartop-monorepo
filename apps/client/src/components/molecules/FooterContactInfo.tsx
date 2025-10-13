export const FooterContactInfo = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-6 font-semibold text-gunmetal-200">Kontaktujte nás</h3>
        <div className="flex flex-col gap-2">
          <a className="text-white hover:underline" href="tel:604544776">
            604 544 776
          </a>
          <a className="text-white hover:underline" href="mailto:info@cartop.cz">
            info@cartop.cz
          </a>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="mb-2 font-semibold text-gunmetal-200">Jsme k dispozici</h3>
        <p className="text-white">Po-Pá 9.00-18.00 h</p>
      </div>
    </div>
  );
};
