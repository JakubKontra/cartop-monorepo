'use client';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center gap-20 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 776 291">
          <path
            stroke="#c90932"
            strokeWidth="2"
            d="M123.883 2.76 164.53 30.49l.802.548-.522.817L69.411 181.01l3.95 6.58h85.427V88.82h51.766v98.77h33.429v44.548h-33.429V289.5h-51.766v-57.362H13.672v-59.796l.16-.247L122.477 3.045l.555-.864zM647.883 2.76 688.53 30.49l.802.548-.522.817-95.399 149.154 3.949 6.58h85.428V88.82h51.766v98.77h33.429v44.548h-33.429V289.5h-51.766v-57.362H537.672v-59.796l.159-.247L646.478 3.045l.555-.864zM424 69.618h-87.072c-2.925 0-5.163 2.496-5.163 5.373V210H277v-83.694C277 63.097 325.773 12 385.787 12H424zM352 230.084h87.072c2.93 0 5.163-2.511 5.163-5.396V89H499v84.117C499 236.649 450.223 288 390.213 288H352z"
          />
        </svg>
        <h2 className="text-gunmetal text-3xl md:text-4xl font-semibold mb-4">
          Stránka <span className="text-primary">nebyla nalezena</span>
        </h2>
      </div>
    </div>
  );
}
